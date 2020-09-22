import {Chatroom} from './chat.js';
import {ChatUI} from './ui.js'


let sendMessage = document.getElementById('myMessageForm');
let setUsername = document.getElementById('updateUsernameForm');
let chatRooms = document.querySelectorAll('.main-content-header div');
let defaultSelectedRoom = document.querySelector('.selected-chatroom');
let chatRoom = new Chatroom (defaultSelectedRoom.getAttribute('value'), 'guest');
let chatRoom1 = new Chatroom ('js', 'guest');
let chatRoom2 = new Chatroom ('homework', 'guest');
let chatRoom3 = new Chatroom ('tests', 'guest');

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
    

})
setUsername.addEventListener('submit', e => {
    e.preventDefault();
    let username = document.getElementById('updateUsername').value;
    chatRoom.username =  username;
    chatRoom1.username =  username;
    chatRoom2.username =  username;
    chatRoom3.username =  username;

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

