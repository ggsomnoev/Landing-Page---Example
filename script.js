// Slow transition to section location
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: "smooth" });
    });
});

/* Toggle class in the main menu */
// $('.nav-menu > li').click(function(){
//     $(this).children('a').toggleClass('active');
//     $(this).siblings('li').children('a').removeClass('active');
// });
function prevSiblings(target) {
    var siblings = [], n = target;
    while (n = n.previousElementSibling) siblings.push(n);
    return siblings;
}

function nextSiblings(target) {
    var siblings = [], n = target;
    while (n = n.nextElementSibling) siblings.push(n);
    return siblings;
}

function siblings(target) {
    var prev = prevSiblings(target) || [],
        next = nextSiblings(target) || [];
    return prev.concat(next);
}

document.querySelectorAll('.nav-menu > li').forEach(link => {

    let sibs = siblings(link);
    sibs.forEach(x => {
        x.childNodes[0].classList.remove('active');
    });

    link.addEventListener('click', function (e) {
        e.preventDefault();
        let linkChild = link.childNodes[0];
        linkChild.classList.add('active');
    });
});
