import pickle
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import requests
import os
import errno
import shutil
import getpass
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


file_path = "C:/Users/" + getpass.getuser() + "/Desktop/python-layouts/"
cookie_path = "C:/Users/" + getpass.getuser() + "/Desktop/python-cookies/"


class Layout:
    def __init__(self):
        options = webdriver.ChromeOptions()        
        options.add_experimental_option("prefs", {
            "download.default_directory": file_path,
            "profile": {
                'default_content_setting_values': {
                    'automatic_downloads': 1
                }
            }
        })
        self.driver = webdriver.Chrome(options=options)
        self.layoutNames = {"ASCII Layout v2": "ascii-layout-v2-layout.xlsx",
            "All_Vars": "all_vars-layout.xlsx", "1000 | CE": "1000---ce-layout.xlsx"}
        self.surveyData = {"adults": {"surveyId": [], "surveyName": []},
                           "kids": {"surveyId": [], "surveyName": []}}

    def login(self, username, password):
        driver = self.driver        
        driver.get("https://auth.cmix.com/")

        #  checks if python-cookie exists, if not it is created
        if not os.path.exists(cookie_path):
            os.makedirs(cookie_path)

        if not os.path.isfile(cookie_path + "CMIXCookies.pkl"):
            WebDriverWait(driver, 60).until(
                    EC.presence_of_element_located((By.NAME, "email"))).send_keys(username)

            passwordElem = driver.find_element_by_name("password")
            passwordElem.send_keys(password)

            passwordElem.send_keys(Keys.ENTER)

            pickle.dump(driver.get_cookies(), open(
                cookie_path + "CMIXCookies.pkl", "wb"))
        else:
            loadedCookies = pickle.load(
                open(cookie_path + "CMIXCookies.pkl", "rb"))
            for cookie in loadedCookies:
                driver.add_cookie(cookie)

    def getSurvetIds(self, surveyType):
        for cookie in self.driver.get_cookies():
            if "APIToken" in cookie["name"]:
                APIToken=cookie["value"]   

        url="https://survey-api.cmix.com/surveys?sortColumn=DATE_CREATED&sortDirection=desc&generalTextSearch=Theatrical%20Tracker%20&onlyMyProjects=0&onlyMyFavorites=0&page=1&paginate=1&itemsPerPage=32&details=1"
        headers={
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,bg;q=0.8",
            "authorization": "Bearer " + APIToken
        }
        r=requests.get(url, headers=headers)
        if "error" not in r.json():
            data=r.json()["data"]
            for survey in data:
                if survey["status"] == "DESIGN":
                    print(str(survey["id"]) + " => " +
                          survey["name"] + " => " + survey["status"])

                    if "Kids" in survey["name"]:
                        self.surveyData["kids"]["surveyId"].append(
                            str(survey["id"]))
                        self.surveyData["kids"]["surveyName"].append(
                            str(survey["name"]))
                    else:
                        self.surveyData["adults"]["surveyId"].append(
                            str(survey["id"]))
                        self.surveyData["adults"]["surveyName"].append(
                            str(survey["name"]))
        else:
            print(r.json()["error"]["message"])

        if (surveyType == "adults"):
            self.surveyIds=self.surveyData["adults"]["surveyId"]
            self.surveyNames=self.surveyData["adults"]["surveyName"]
        else:
            self.surveyIds=self.surveyData["kids"]["surveyId"]
            self.surveyNames=self.surveyData["kids"]["surveyName"]

    def createDirs(self):
        #  checks if python-layout directory exists, if not it is created
        if not os.path.exists(file_path):
            os.makedirs(file_path)

        i=0
        while i < len(self.surveyIds):
            try:
                os.mkdir(os.path.join(
                    file_path, self.surveyIds[i] + " - " + self.surveyNames[i]))
            except OSError as e:
                print(e)
                print("***REMOVING THE DIRECTORY***")
                shutil.rmtree(file_path)
                os.makedirs(file_path)
                os.mkdir(os.path.join(
                    file_path, self.surveyIds[i] + " - " + self.surveyNames[i]))
            i = i + 1

    def dowloadLayouts(self):
        # Creating the dir before dowloading layouys
        self.createDirs()
        driver=self.driver
        i=0
        while i < len(self.surveyIds):
            driver.get(
                "https://www.cmix.com/survey/datadownload?svy="+self.surveyIds[i])
            time.sleep(1)

            layout=driver.find_element_by_name("layout-field")
            xp='//*[@id="layout-field"][@aria-expanded="false"]'

            for layoutName in self.layoutNames:
                layout.clear()
                layout.send_keys(layoutName)
                time.sleep(1)
                WebDriverWait(driver, 60).until(
                    EC.presence_of_element_located((By.XPATH, xp)))
                driver.find_element_by_xpath(
                    "//div[@class='layout-selection_action-btns']/button[2]").click()

            # Manual sleep, waiting for the files to begin/finish downloading
            # before moving them to the corresponding directory
            time.sleep(10)
            files=[f for f in os.listdir(file_path) if os.path.isfile(
                os.path.join(file_path, f))]
            for f in files:
                shutil.move(file_path+f, file_path +
                            self.surveyIds[i]+" - "+self.surveyNames[i])
            i = i + 1

    def uploadLayouts(self):
        driver=self.driver
        i=0
        while i < len(self.surveyIds):
            driver.get(
                "https://www.cmix.com/survey/datadownload?svy="+self.surveyIds[0])
            # The survey I was testing on.
            # driver.get(
            #     "https://www.cmix.com/survey/datadownload?svy=20286")
            time.sleep(1)

            layout=driver.find_element_by_name("layout-field")
            xp='//*[@id="layout-field"][@aria-expanded="false"]'

            for layoutName in self.layoutNames:
                layout.clear()
                layout.send_keys(layoutName)
                time.sleep(1)
                WebDriverWait(driver, 60).until(
                    EC.presence_of_element_located((By.XPATH, xp)))
                driver.find_element_by_xpath(
                    "//div[@class='layout-selection_action-btns']/button[1]").click()
                time.sleep(1)
                driver.find_element_by_xpath(
                    "//md-dialog-actions[@layout='row']/button[1]").click()
                time.sleep(1)
                driver.find_element_by_xpath(
                    "//input[@id='upload-layout-excel-file']").send_keys(os.path.join(
                            file_path, self.surveyIds[0] + " - " + self.surveyNames[0]) + "/" + self.layoutNames[layoutName])
                time.sleep(1)
                driver.find_element_by_xpath(
                    "//md-dialog-actions[@class='md-padding']/button[2]").click()
                # Again manual wait until the layout loads then Save is clicked.
                time.sleep(10)
                # WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.XPATH, "//div[@layout='row']/button[2][@disabled!='disabled']")))
                driver.find_element_by_xpath(
                    "//span[contains(text(), 'Save')]").click()
            i=i + 1

    def closeBrowser(self):
        self.driver.close()


newLayout=Layout()
newLayout.login("cmixautomation@gmail.com", "")
newLayout.getSurvetIds("adults")
newLayout.dowloadLayouts()
# newLayout.uploadLayouts()
# newLayout.closeBrowser()


