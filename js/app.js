/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navbarList = document.getElementById("navbar__list")
const sections = document.querySelectorAll('main section')

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function setNavItemAsActive(element){
    const items = navbarList.getElementsByTagName('li');
        for(item of items){
            item.classList.remove('active');
        }
        element.classList.add('active');
}

function addClassToActiveSection(section){
    for(sec of sections){
        sec.classList.remove('your-active-class');
    }
    section.classList.add('your-active-class');
}

function isSectionInView(section, top, lessValue){
    const bClient= section.getBoundingClientRect();
    if (bClient.top > top & bClient.top < lessValue) {
        lessValue = bClient.top;
        return true;
    };
    return false;
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildMenu(){
    const docFrag = document.createDocumentFragment();

    for(const section of sections){
        const sectionId = section.getAttribute('id');
        const sectionTitle = section.getAttribute('data-nav');
        const navItem = document.createElement('li');
        navItem.setAttribute('data-section', sectionId);
        navItem.textContent = sectionTitle;
        docFrag.appendChild(navItem);
    }

    navbarList.appendChild(docFrag);
}


// Add class 'active' to section when near top of viewport
function setActive(){
    window.addEventListener('scroll', function(e){
 
        let section = null;
        let lessValue = 999999;
        for (sec of sections) {
            if (isSectionInView(sec, -280, lessValue)) {
                lessValue = sec.getBoundingClientRect().top;
                section = sec;
            };
        };

        if(!section)
        section = sections[0];

        const navItem =  navbarList.querySelector(`[data-section=${section.id}]`);
        setNavItemAsActive(navItem)
        addClassToActiveSection(section)
    });
}

// Scroll to anchor ID
function scrollTo(){
    navbarList.addEventListener('click', function(e){
        const sectionId = e.target.getAttribute('data-section');
        //setNavItemAsActive(e.target)
        //addClassToActiveSection(e.target)
        document.getElementById(sectionId).scrollIntoView();
    });
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildMenu();

// Scroll to section on link click
scrollTo();

// Set sections as active
setActive();


