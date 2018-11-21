from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import requests


def getSurvetIds():
    result = {"adults": [], "kids": []}
    url = "https://survey-api.cmix.com/surveys?sortColumn=DATE_CREATED&sortDirection=desc&generalTextSearch=Theatrical%20Tracker%20&onlyMyProjects=0&onlyMyFavorites=0&page=1&paginate=1&itemsPerPage=32&details=1"
    headers = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,bg;q=0.8",
        "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVmODRlNGU3YThkNmI1ZmU5MzI3YjVkYTRkYjgxYjNjMzE0ODI1MGVhYThiOTY0M2FmZDEzMjE2ZmE4ZDk0MDlmOWI2ZTRlMmY1NDIyMDlmIn0.eyJhdWQiOiJDTUlYIEF1dGgiLCJqdGkiOiJlZjg0ZTRlN2E4ZDZiNWZlOTMyN2I1ZGE0ZGI4MWIzYzMxNDgyNTBlYWE4Yjk2NDNhZmQxMzIxNmZhOGQ5NDA5ZjliNmU0ZTJmNTQyMjA5ZiIsIm5iZiI6MTU0MjIwMzcwNSwiZXhwIjoxNTQ0Nzk1NzY1LCJzdWIiOiIzNjU0Iiwic2NvcGVzIjpbXX0.E0nYNglL2UCKUXHrwQlEwtN70_35X-Eo94qG7zpRTG4qKZfAoLPA4WKZ2neM4oaU-npzQjdvMceH4XFW1knXJCsl8xS98RD12wj19_4dkNPYD6SCj02WywyOoXG7oIaiTjpm_4pZXKvNTEc29mvH9WFINCukC5f0PiS6NGLyFy779dt0oPbtQGmvvdE5Ru2v0Hh8WVzmqgxxDQRKTgzC7OXPk3Ht0M7DDN6luaUtngmk8tlGrNHDDXlAcePRyrAqXW8zxnQob-1XuqJW6CsAWOfguZbHUkM4CLV9eNXrwHtfg_sFh7ZRO1xQ5dLwyUvk9yM5ELoFHiHGo50J3SyhhrzQ_R2eUXV1RDWrT8xolwbgTnyPCv9MKiCJLVoqbwq_rM6sKvw6B-7B7bAGoVh_C3SVkRSrfQykUIb23FjT2KpNG8fnVLN0g2DH7CQQtegR-2zCL5Rbr57bL4rJ2EsL9V8ReYc23V-nqGrxuxFO32mWqn6GtyiHcr-AlZuSajP4NNKsqVIfHURSqyU-iylnftQawpWcjQv9OT_3nYXqQ2S5WSlmEhAxfpdLRtqsqhNCHCfV4ZasZTYYmr8h_LmsCSvTCErUCUVURQ7tzFt8K3bMS8qLwf0Wnyriy0Qlw7j_x-B6v__Byj-GBdmyTQo7KnEiQ0LbxfOySoVb-njQWOY"
    }
    r = requests.get(url, headers=headers)
    if "error" not in r.json():
        data = r.json()["data"]
        for survey in data:
            if survey["status"] == "DESIGN":
                print(str(survey["projectId"]) + " => " +
                      survey["name"] + " => " + survey["status"])

                if "Kids" in survey["name"]:
                    result["kids"].append(str(survey["projectId"]))
                else:
                    result["adults"].append(str(survey["projectId"]))
    else:
        print(r.json()["error"]["message"])
    return result
    # --- Authtoken ---
    # document.cookie.split(';').filter((item) => item.includes('APIToken='))[0].replace("APIToken=", "")
    # session = requests.Session()
    # print(session.cookies.get_dict())


class Layout:
    def __init__(self):
        options = webdriver.ChromeOptions()
        options.add_argument(
            "download.default_directory=C:/Users/gsomnoev/Desktop/layout-python/")
        self.driver = webdriver.Chrome(options=options)

    def closeBrowser(self):
        self.driver.close()

    def login(self, username, password):
        driver = self.driver
        driver.get("https://launchpad.cmix.com/#/search")
        time.sleep(1)

        usernameElem = driver.find_element_by_name("email")
        usernameElem.clear()
        usernameElem.send_keys(username)

        passwordElem = driver.find_element_by_name("password")
        passwordElem.clear()
        passwordElem.send_keys(password)

        passwordElem.send_keys(Keys.ENTER)

    def search(self, projectIds):
        driver = self.driver
        adults = projectIds["adults"]
        kids = projectIds["kids"]
        print(adults)
        driver.get(
            "https://launchpad.cmix.com/#/dashboard/data-reporting/export-files?prj="+adults[0])
        time.sleep(10)
        layout = driver.find_element_by_xpath("//*[@class='small-8 or @class='medium-6'' or @class='columns' or @class='medium-offset-2']")
        # layout.send_keys("ASCII Layout v2")
        # layout.send_keys(Keys.ENTER)
        driver.find_element_by_tag_name('body').send_keys(Keys.CONTROL + 't')
        # driver.find_element_by_xpath("//button[@class='primary']").click()
        # driver.find_element_by_xpath("//contains[text(), 'All Surveys']").click()
        # time.sleep(1)


newLayout = Layout()
# newLayout.login("cmixautomation@gmail.com", "123456")
newLayout.login("gsomnoev@criticalmix.com", "archi21#")
projectIds = getSurvetIds()
newLayout.search(projectIds)
