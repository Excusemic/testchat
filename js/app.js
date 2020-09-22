import {Chatroom} from './chat.js';
import {ChatUI} from './ui.js'


let sendMessage = document.getElementById('myMessageForm');
let setUsername = document.getElementById('updateUsernameForm');
let chatRooms = document.querySelectorAll('.main-content-header div');
let defaultSelectedRoom = document.querySelector('.selected-chatroom');
let currentUser = `guest${randomNo()}`;
let usernameUpdateBtn = document.getElementById('updateUsername')
if (localStorage.getItem('username') == null) {
    localStorage.setItem('username', currentUser)
    
}
usernameUpdateBtn.placeholder = `username: ${localStorage.getItem('username')}`

let chatRoom = new Chatroom (defaultSelectedRoom.getAttribute('value'), localStorage.getItem('username'));
let chatRoom1 = new Chatroom ('js', localStorage.getItem('username'));
let chatRoom2 = new Chatroom ('homework', localStorage.getItem('username'));
let chatRoom3 = new Chatroom ('tests', localStorage.getItem('username'));
function randomNo() {
    let num = Math.floor(Math.random() * 1000); 
    return num;
}
chatRooms.forEach(btn => {
    btn.addEventListener('click', () => {
        chatRooms.forEach(room => {
            room.classList.remove('selected-chatroom');
        })
        let room = btn.getAttribute('value');
        btn.classList.add('selected-chatroom');
        document.querySelector('.chat-messages ul').innerHTML='';
        db.collection('chats')
        .where('room', '==', room)
        .orderBy('created_at', 'asc')
        .get()
        .then(snapshot => {
            snapshot.forEach(elem =>{
                let data = elem.data();
                let testUI = new ChatUI(data);
                testUI.templateLI()
            })
        })
    })
})

sendMessage.addEventListener('submit', e => {
    e.preventDefault();
    let mymessage = document.getElementById('mymessage').value;
    let selectedRoom = document.querySelector('.selected-chatroom');
    if (selectedRoom.getAttribute('value') == 'general'){
        chatRoom.addChat(mymessage)
    } else if (selectedRoom.getAttribute('value') == 'js') {
        chatRoom1.addChat(mymessage)
    } else if (selectedRoom.getAttribute('value') == 'homework') {
        chatRoom2.addChat(mymessage)
    } else if (selectedRoom.getAttribute('value') == 'tests') {
        chatRoom3.addChat(mymessage)
    }
    document.getElementById('mymessage').value='';
    

})
setUsername.addEventListener('submit', e => {
    e.preventDefault();
    let username = document.getElementById('updateUsername').value;
        if(!/\S/.test(username))  {
            alert('username ne moze biti prazno polje')
            document.getElementById('updateUsername').value = '';
        } else if (username.length < 3 || username.length > 10) {
            alert('username mora biti izmedju 2 i 10 karaktera')
            document.getElementById('updateUsername').value = '';
            
        } else {
            chatRoom.username =  username;
            chatRoom1.username =  username;
            chatRoom2.username =  username;
            chatRoom3.username =  username;
            localStorage.setItem('username', username)
            usernameUpdateBtn.placeholder = `username: ${localStorage.getItem('username')}`
            
        }
})
chatRoom.getChats(data => {
    let testUI = new ChatUI(data);
    let selectedRoom = document.querySelector('.selected-chatroom');
    if (selectedRoom.getAttribute('value') == 'general'){
        testUI.templateLI()
    }

})
chatRoom1.getChats(data => {
    let testUI = new ChatUI(data);
    let selectedRoom = document.querySelector('.selected-chatroom');
    if (selectedRoom.getAttribute('value') == 'js'){
        testUI.templateLI()
    }
})
chatRoom2.getChats(data => {
    let testUI = new ChatUI(data);
    let selectedRoom = document.querySelector('.selected-chatroom');
    if (selectedRoom.getAttribute('value') == 'homework'){
        testUI.templateLI()
    }
})
chatRoom3.getChats(data => {
    let testUI = new ChatUI(data);
    let selectedRoom = document.querySelector('.selected-chatroom');
    if (selectedRoom.getAttribute('value') == 'tests'){
        testUI.templateLI()
    }
})

