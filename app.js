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
 *x
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

const sectionList = document.querySelectorAll('section');

let activeSection = document.querySelector('.your-active-class');

let activeNav = document.querySelector('.active-nav');

let lastScrollY = 0;

const upButton = document.querySelector('#up-button');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav:
// function the gathers data for the nav bar, then calls to add the listeners
function activateCode() {
    const navBar = document.querySelector('#navbar__list');
    const docFrag = document.createDocumentFragment();
    for (const section of sectionList) {
        const newNavLink = makeNewNavLink(section);
        docFrag.appendChild(newNavLink);
    }
    navBar.appendChild(docFrag);
    initiateListeners(navBar);
}




/**
 * End Main Functions
 * Begin Events
 *
*/



// Build menu:
// Creates a new nav link with classes based on the section parameter, and returns a new nav link
function makeNewNavLink(section) {
    const newNavLink = document.createElement('li');
    newNavLink.classList.add('menu__link');
    newNavLink.textContent = section.dataset.nav;
    newNavLink.setAttribute('data-id', section.id);
    newNavLink.id = `nav-${section.id}`;
    //if activeNav does not exist
    if (activeNav == null) {
        //add the class of 'active-nav' to the newNavLink
        newNavLink.classList.add('active-nav')
        //newNavLink is now activeNav
        activeNav = newNavLink;
    }
    return newNavLink;
}



//function for listeners:  navbar click, scroll
function initiateListeners(navBar) {
    navBar.addEventListener('click', onNavClick);
    document.addEventListener('scroll', checkForScroll);
    upButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'})
      }
    );
}




// Scroll to section:
function onNavClick(event) {
     //defines section, and scrolls smoothly to the corresponding section after click on nav
    const section = document.querySelector(`#${event.target.dataset.id}`);
    section.scrollIntoView({behavior: 'smooth'});
}

//checking for scroll on document.
// Add class 'active' to section when near top of viewport

function checkForScroll() {
  // Checks the position of page in the window. Controls visibility of the go-up-button.
    const viewportHeight = window.innerHeight;
    // Checks if user is scrolling up or down, sets the screen coverage ratio accordingly.
    let activeRatio;
    if (window.scrollY > 200) {
        upButton.classList.remove('hide');
    } else {
        upButton.classList.add('hide');
    }
    if (window.scrollY > lastScrollY) {
        activeRatio = viewportHeight/3;
    } else {
        activeRatio = viewportHeight*2/3;
    }
    lastScrollY = window.scrollY;
    //Uses the ratio to determine which section is active.
    for (const section of sectionList) {
        const position = section.getBoundingClientRect();
        if (position.top < activeRatio && position.bottom > activeRatio && section !== activeSection) {
            moveActiveSection(section);
            moveActiveNav(document.querySelector(`#nav-${section.id}`));
            break;
        }
    }
}

// Set sections and navs as active
// Removes active-section class from previous active section, adds the class to new active section.
function moveActiveSection(section) {
    activeSection.classList.remove('your-active-class');
    section.classList.add('your-active-class');
    activeSection = section;
}

// Removes active-nav class from previous active navigation button, adds the class to new active navigation button.
function moveActiveNav(nav) {
    activeNav.classList.remove('active-nav');
    nav.classList.add('active-nav')
    activeNav = nav;
}


/**
 * Execute the program
 *
*/

//function call for initiating the code on this page.
activateCode();
