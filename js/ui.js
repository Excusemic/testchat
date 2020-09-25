
export class ChatUI{
    constructor(a, b){
        this.messageList = a;
        this.messageId = b;
        this.ul = document.querySelector('.chat-messages ul')
    }
    set messageList(m) {
        this._messageList = m;
    }
    get messageList() {
        return this._messageList;
    }
    set messageId(m) {
        this._messageId = m;
    }
    get messageId() {
        return this._messageId;
    }
    templateLI(elem){
        elem = this.messageList;
        let id = this.messageId;
        let div = document.createElement('div');
        div.setAttribute('class', 'messageDiv')
        let li = document.createElement('li');
        li.setAttribute('data-id', id)
        let spanUser = document.createElement('span')
        let spanMessage = document.createElement('span')
        let pDate = document.createElement('p');
        let pDateToday = document.createElement('p');
        let msg = elem.message;
        let user = elem.username;
        let dateStamp = elem.created_at;
        let date = dateStamp.toDate();
        let currentDate = new Date();
        let dayToday = currentDate.getDate();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let arrayOfRows = msg.split("\n");
        let deleteBtn = document.createElement('p')
        deleteBtn.innerHTML="X";
        deleteBtn.addEventListener('click', this.deleteMsg)
        deleteBtn.classList.add('xbtn')
        spanUser.innerHTML=`${user}: `
        spanUser.style.fontWeight = "bold"
        arrayOfRows.forEach(row => {
            spanMessage.innerHTML+=`<span class="rowSpan">${row}</span>`;
        })
        if(minutes >= 0 && minutes <= 9) {
            minutes = `0${minutes}`;
        }
        if(hours >= 0 && hours <= 9) {
            hours = `0${hours}`;
        }
        if(day >= 0 && day <= 9) {
            day = `0${day}`;
        }
        if(month >= 0 && month <= 9) {
            month = `0${month}`;
        }
        pDate.innerHTML=`${day}.${month}.${year} - ${hours}:${minutes}`
        pDateToday.innerHTML=`${hours}:${minutes}`;
        spanUser.append(deleteBtn)
        div.append(spanUser);
        div.append(spanMessage);
        if(dayToday==day) {
            div.append(pDateToday);
        } else {
            div.append(pDate);
        }
        li.append(div);
        
        this.ul.append(li);
        if (spanUser.innerHTML.includes(localStorage.getItem('username'))) {
            spanUser.parentElement.setAttribute('class', 'homeMessage')
            spanUser.parentElement.parentElement.style.float = "right";
            spanUser.parentElement.scrollIntoView({behavior: "smooth"});
        }

    }
    deleteMsg(elem) {
        let msg = elem.target.parentElement.parentElement.parentElement;
        let msgDeletingId = msg.getAttribute('data-id')
        document.querySelector('.overlay').style.display="flex";
        let yesbtn = document.querySelector('.yes');
        let nobtn = document.querySelector('.no');
        yesbtn.addEventListener('click', () => {
             db.collection("chats").doc(msgDeletingId).delete().then(e => msg.remove())
             document.querySelector('.overlay').style.display="none";
        })
        nobtn.addEventListener('click', () => {
            document.querySelector('.overlay').style.display="none";
       })
        
    }
}

