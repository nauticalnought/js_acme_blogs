/*
Title: INF 651 Final Project
Author: Sones, Daniel
Date: 1 December, 2024

1. createElemWithText
    a. Receives up to 3 parameters
    b. 1st parameter is the HTML element string name to be created 
       (h1, p, button, etc)
    c. Set a default value for the 1st parameter to “p”
    d. 2nd parameter is the textContent of the element to be created
    e. Default value of the 2nd parameter is an empty string.
    f. 3rd parameter is a className if one is to be applied (optional)
    g. Use document.createElement() to create the requested HTML element
    h. Set the other desired element attributes.
    i. Return the created element.
*/
function createElemWithText(elementType = "p", textContent = "", className) {
    const element = document.createElement(elementType);
    element.textContent = textContent;
    if (className) {
        element.className = className;
    }
    return element;
}


/*
2. createSelectOptions
    a. Receives users JSON data as a parameter
    b. Returns undefined if no parameter received
    c. Loops through the users data
    d. Creates an option element for each user with 
       document.createElement()
    e. Assigns the user.id to the option.value
    f. Assigns the user.name to the option.textContent
    g. Return an array of options elements
*/
function createSelectOptions(users) {
    if (!users) {
        return undefined;
    }
    const optionsArray = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        optionsArray.push(option);
    }
    return optionsArray;
}


/*
3. toggleCommentSection
    a. Receives a postId as the parameter
    b. Selects the section element with the data-post-id attribute 
       equal to the postId received as a parameter
    c. Use code to verify the section exists before attempting to 
       access the classList property
    d. Toggles the class 'hide' on the section element
    e. Return the section element
*/
function toggleCommentSection(postId) {
    if (!postId) {
        return undefined;
    }
    const section = document.querySelector(`section[data-post-id="${postId}"]`);
    if (!section) {
        console.log(`No section found with postId: ${postId}`);
        return null;
    }
    section.classList.toggle('hide');
    return section;
}


/*
4. toggleCommentButton
    a. Receives a postId as the parameter
    b. Selects the button with the data-post-id attribute equal to 
       the postId received as a parameter
    c. If the button textContent is 'Show Comments' switch textContent to 'Hide Comments'
    d. If the button textContent is 'Hide Comments' switch textContent to 'Show Comments'
    e. Return the button element
*/
function toggleCommentButton(postId) {
    if (!postId) {
        return undefined;
    }
    const button = document.querySelector(`button[data-post-id="${postId}"]`);
    if (!button) {
        console.log(`No button found with postId: ${postId}`);
        return null;
    }
    button.textContent = button.textContent === 'Show Comments' 
        ? 'Hide Comments' 
        : 'Show Comments';
    console.log(`Button text toggled for postId: ${postId}`);
    return button;
}


/*
5. deleteChildElements
    a. Receives a parentElement as a parameter
    b. Define a child variable as parentElement.lastElementChild
    c. While the child exists…(use a while loop)
    d. Use parentElement.removeChild to remove the child in the loop
    e. Reassign child to parentElement.lastElementChild in the loop
    f. Return the parentElement
*/
function deleteChildElements(parentElement) {
    if (!parentElement || !(parentElement instanceof HTMLElement)) {
        return undefined;
    }
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
    return parentElement;
}


/*
6. addButtonListeners
    a. Selects all buttons nested inside the main element
    b. If buttons exist:
    c. Loop through the NodeList of buttons
    d. Gets the postId from button.dataset.postId
    e. If a postId exists, add a click event listener to the button 
       inside the loop so this happens to each button
    f. The listener calls an anonymous function
    g. Inside the anonymous function: the function toggleComments is called 
       with the event and postId as parameters
    h. Return the button elements which were selected
*/
function addButtonListeners() {
    const buttons = document.querySelectorAll('main button');
    if (buttons.length === 0) {
        return buttons; 
    }
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const postId = button.dataset.postId;
        if (postId) {
            button.addEventListener('click', function(event) {
                toggleComments(event, postId);
            });
        }
    }
    return buttons;
}


/*
7. removeButtonListeners
    a. Selects all buttons nested inside the main element
    b. Loops through the NodeList of buttons
    c. Gets the postId from button.dataset.id
    d. If a postId exists, remove the click event listener from the button 
       inside the loop so this happens to each button
    e. Return the button elements which were selected
*/
function removeButtonListeners() {
    const buttons = document.querySelectorAll('main button');
    if (buttons.length > 0) {
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            const postId = button.dataset.postId;
            if (postId) {
                const toggleFunc = function(event) {
                    toggleComments(event, postId);
                };
                button.removeEventListener('click', toggleFunc);
            }
        }
        return buttons;
    }
    return [];
}


/*
8. createComments
    a. Receives JSON comments data as a parameter
    b. Creates a fragment element with document.createDocumentFragment()
    c. Loop through the comments
    d. For each comment do the following:
        e. Create an article element with document.createElement()
        f. Create an h3 element with createElemWithText('h3', comment.name)
        g. Create a paragraph element with createElemWithText('p', comment.body)
        h. Create a paragraph element with createElemWithText
           ('p', `From: ${comment.email}`)
        i. Append the h3 and paragraphs to the article element
        j. Append the article element to the fragment
    k. Return the fragment element
*/
function createComments(comments) {
    if (!comments) {
        return undefined;
    }
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        const article = document.createElement('article');
        const h3 = createElemWithText('h3', comment.name);
        const pBody = createElemWithText('p', comment.body);
        const pEmail = createElemWithText('p', `From: ${comment.email}`);
        article.appendChild(h3);
        article.appendChild(pBody);
        article.appendChild(pEmail);
        fragment.appendChild(article);
    }
    return fragment;
}


/*
9. populateSelectMenu
    a. Receives the users JSON data as a parameter
    b. Selects the #selectMenu element by id
    c. Passes the users JSON data to createSelectOptions()
    d. Receives an array of option elements from createSelectOptions
    e. Loops through the options elements and appends each option element 
       to the select menu
    f. Return the selectMenu element
*/
function populateSelectMenu(users) {
    if (!users) {
        return undefined;
    }
    const selectMenu = document.getElementById('selectMenu');
    if (!selectMenu) {
        return undefined;
    }
    const options = createSelectOptions(users);
    if (!options) {
        return selectMenu;
    }
    for (let i = 0; i < options.length; i++) {
        selectMenu.appendChild(options[i]);
    }
    return selectMenu;
}


/*
10. getUsers
    a. Fetches users data from: https://jsonplaceholder.typicode.com/
    b. Should be an async function
    c. Should utilize a try / catch block
    d. Uses the fetch API to request all users
    e. Await the users data response
    f. Return the JSON data
*/
async function getUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        return users;
    } catch (error) {
        return undefined;
    }
}


/*
11. getUserPosts
    a. Receives a user id as a parameter
    b. Fetches post data for a specific user id from: https://jsonplaceholder.typicode.com/
    c. Should be an async function
    d. Should utilize a try / catch block
    e. Uses the fetch API to request all posts for a specific user id
    f. Await the users data response
    g. Return the JSON data
*/
async function getUserPosts(userId) {
    if (!userId) {
        return undefined;
    }
    try {
        const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
        const response = await fetch(url);
        const posts = await response.json();
        return posts;
    } catch (error) {
        return undefined;
    }
}


/*
12. getUser
    a. Receives a user id as a parameter
    b. Fetches data for a specific user id from: https://jsonplaceholder.typicode.com/
    c. Should be an async function
    d. Should utilize a try / catch block
    e. Uses the fetch API to request a specific user id
    f. Await the user data response
    g. Return the JSON data
*/
async function getUser(userId) {
    if (!userId) {
        return undefined;
    }
    try {
        const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
        const response = await fetch(url);
        const user = await response.json();
        return user;
    } catch (error) {
        return undefined;
    }
}


/*
13. getPostComments
    a. Receives a post id as a parameter
    b. Fetches comments for a specific post id from: https://jsonplaceholder.typicode.com/
    c. Should be an async function
    d. Should utilize a try / catch block
    e. Uses the fetch API to request all comments for a specific post id
    f. Await the users data response
    g. Return the JSON data
*/
async function getPostComments(postId) {
    if (!postId) {
        return undefined;
    }
    try {
        const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
        const response = await fetch(url);
        const comments = await response.json();
        console.log(`Comments for postId ${postId}:`, comments);
        return comments;
    } catch (error) {
        console.error(`Error fetching comments for postId ${postId}:`, error);
        return undefined;
    }
}


/*
14. displayComments
    a. Dependencies: getPostComments, createComments
    b. Is an async function
    c. Receives a postId as a parameter
    d. Creates a section element with document.createElement()
    e. Sets an attribute on the section element with section.dataset.postId
    f. Adds the classes 'comments' and 'hide' to the section element
    g. Creates a variable comments equal to the result of await getPostComments(postId);
    h. Creates a variable named fragment equal to createComments(comments)
    i. Append the fragment to the section
    j. Return the section element
*/
async function displayComments(postId) {
    if(!postId) {
        return undefined;
    }
    const section = document.createElement('section');
    section.dataset.postId = postId;
    section.classList.add('comments', 'hide');
    const comments = await getPostComments(postId);
    console.log("Comments for postId", postId, comments);
    const fragment = createComments(comments);
    section.appendChild(fragment);
    console.log("Comment section created:", section);
    return section;
}


/*
15. createPosts
    a. Dependencies: createElemWithText, getUser, displayComments
    b. Is an async function
    c. Receives posts JSON data as a parameter
    d. Create a fragment element with document.createDocumentFragment()
    e. Loops through the posts data
    f. For each post do the following:
    g. Create an article element with document.createElement()
    h. Create an h2 element with the post title
    i. Create an p element with the post body
    j. Create another p element with text of `Post ID: ${post.id}`
    k. Define an author variable equal to the result of await getUser(post.userId)
    l. Create another p element with text of `Author: ${author.name} with ${author.company.name}`
    m. Create another p element with the author’s company catch phrase.
    n. Create a button with the text 'Show Comments'
    o. Set an attribute on the button with button.dataset.postId = post.id
    p. Append the h2, paragraphs, button, and section elements you have created to the article element.
    q. Create a variable named section equal to the result of await displayComments(post.id);
    r. Append the section element to the article elements. After the loop completes, append the article element to the fragment
    t. Return the fragment element
*/
async function createPosts(posts) {
    if (!posts) {
        return undefined;
    }
    const fragment = document.createDocumentFragment();
    for (const post of posts) {
        const article = document.createElement('article');
        const h2 = createElemWithText('h2', post.title);
        const pBody = createElemWithText('p', post.body);
        const pPostId = createElemWithText('p', `Post ID: ${post.id}`);
        const author = await getUser(post.userId);
        const pAuthor = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
        const pCatchPhrase = createElemWithText('p', author.company.catchPhrase);
        const button = document.createElement('button');
        button.textContent = 'Show Comments';
        button.dataset.postId = post.id;
        article.appendChild(h2);
        article.appendChild(pBody);
        article.appendChild(pPostId);
        article.appendChild(pAuthor);
        article.appendChild(pCatchPhrase);
        article.appendChild(button);
        const section = document.createElement('section');
        section.dataset.postId = post.id;
        section.classList.add('comments', 'hide');
        const commentsSection = await displayComments(post.id);
        section.appendChild(commentsSection);
        article.appendChild(section);
        fragment.appendChild(article);
    }
    return fragment;
}


/*
16. displayPosts
    a. Dependencies: createPosts, createElemWithText
    b. Is an async function
    c. Receives posts data as a parameter
    d. Selects the main element
    e. Defines a variable named element that is equal to:
        i. IF posts exist: the element returned from await createPosts(posts)
        ii. IF post data does not exist: create a paragraph element that is 
            identical to the default paragraph found in the html file.
        iii. Optional suggestion: use a ternary for this conditional
    f. Appends the element to the main element
    g. Returns the element variable
*/
async function displayPosts(posts) {
    if (!posts) {
        return createElemWithText('p', 'Select an Employee to display their posts.', 'default-text');
    }
    const mainElement = document.querySelector('main');
    const element = posts && posts.length > 0
        ? await createPosts(posts)
        : createElemWithText('p', 'No posts available.');
    console.log("Element to be appended:", element);
    mainElement.appendChild(element);
    return element;
}


/*
17. toggleComments
a. Dependencies: toggleCommentSection, toggleCommentButton
b. Receives 2 parameters:
    i. The event from the click event listener is the 1st param
    ii. Receives a postId as the 2nd parameter
c. Sets event.target.listener = true
d. Passes the postId parameter to toggleCommentSection()
e. toggleCommentSection result is a section element
f. Passes the postId parameter to toggleCommentButton()
g. toggleCommentButton result is a button
h. Return an array containing the section element returned from 
    toggleCommentSection and the button element returned from 
    toggleCommentButton: [section, button]
*/
function toggleComments(event, postId) {
    if (!event || !postId) {
        return undefined;
    }
    event.target.listener = true;
    const section = toggleCommentSection(postId);
    const button = toggleCommentButton(postId);
    return [section, button];
}


/*
18. refreshPosts
    a. Dependencies: removeButtonListeners, deleteChildElements, displayPosts, 
       addButtonListeners
    b. Is an async function
    c. Receives posts JSON data as a parameter
    d. Call removeButtonListeners
    e. Result of removeButtonListeners is the buttons returned from this function
    f. Call deleteChildElements with the main element passed in as the parameter
    g. Result of deleteChildElements is the return of the main element
    h. Passes posts JSON data to displayPosts and awaits completion
    i. Result of displayPosts is a document fragment
    j. Call addButtonListeners
    k. Result of addButtonListeners is the buttons returned from this functionl. 
       Return an array of the results from the functions called: 
       [removeButtons, main, fragment, addButtons]
*/
async function refreshPosts(posts) {
    if (!posts) {
        return undefined;
    }
    try {
        const removeButtons = removeButtonListeners();
        const main = document.querySelector('main');
        deleteChildElements(main);
        const fragment = await displayPosts(posts);
        const addButtons = addButtonListeners();
        return [removeButtons, main, fragment, addButtons];
    } catch (error) {
        console.error("Error refreshing posts:", error);
    }
}


/*
19. selectMenuChangeEventHandler
    a. Dependencies: getUserPosts, refreshPosts
    b. Should be an async function
    c. Automatically receives the event as a parameter
    d. Disables the select menu when called into action (disabled property)
    e. Defines userId = event.target.value || 1;
    f. Passes the userId parameter to await getUserPosts
    g. Result is the posts JSON data
    h. Passes the posts JSON data to await refreshPosts
    i. Result is the refreshPostsArray
    j. Enables the select menu after results are received (disabled property)
    k. Return an array with the userId, posts and the array returned 
       from refreshPosts: [userId, posts, refreshPostsArray]
*/
async function selectMenuChangeEventHandler(event) {
    if (!event) {
        return undefined;
    }
    const selectMenu = event?.target;
    if (!selectMenu || selectMenu.tagName !== 'SELECT') {
        return [1, [], []];
    }
    selectMenu.disabled = true;
    const userId = selectMenu.value || 1;
    console.log("UserId from select:", userId);
    try {
        const posts = await getUserPosts(userId);
        if (!Array.isArray(posts)) {
            throw new Error('posts is not a valid array');
        }
        console.log("Posts:", posts);
        const refreshPostsArray = await refreshPosts(posts);
        if (!Array.isArray(refreshPostsArray)) {
            throw new Error('refreshPostsArray is not a valid array');
        }
        console.log("RefreshPostsArray:", refreshPostsArray);
        selectMenu.disabled = false;
        return [userId, posts, refreshPostsArray];
    } catch (error) {
        console.error("Error handling select menu change:", error);
        selectMenu.disabled = false;
        return [userId, [], []];
    }
}


/*
20. initPage
    a. Dependencies: getUsers, populateSelectMenu
    b. Should be an async function
    c. Noparameters.
    d. Call await getUsers
    e. Result is the users JSON data
    f. Passes the users JSON data to the populateSelectMenu function
    g. Result is the select element returned from populateSelectMenu
    h. Return an array with users JSON data from getUsers and the select 
       element result from populateSelectMenu: [users, select]
*/
async function initPage() {
    try {
        const users = await getUsers();
        const select = populateSelectMenu(users);
        return [users, select];
    } catch (error) {
        console.error("Error in initPage:", error);
    }
}


/*
21. initApp
    a. Dependencies: initPage, selectMenuChangeEventHandler
    b. Call the initPage() function.
    c. Select the #selectMenu element by id
    d. Add an event listener to the #selectMenu for the “change” event
    e. The event listener should call selectMenuChangeEventHandler 
       when the change event fires for the #selectMenu
*/
function initApp() {
    initPage();
    const selectMenu = document.getElementById("selectMenu");
    selectMenu.addEventListener('change', selectMenuChangeEventHandler);  
}


document.addEventListener('DOMContentLoaded', initApp);