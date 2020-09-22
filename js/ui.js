
export class ChatUI{
    constructor(a){
        this.messageList = a;
        this.ul = document.querySelector('.chat-messages ul')
    }
    set messageList(m) {
        this._messageList = m;
    }
    get messageList() {
        return this._messageList;
    }
    templateLI(elem){
        elem = this.messageList;
        let div = document.createElement('div');
        div.setAttribute('class', 'messageDiv')
        let li = document.createElement('li');
        let spanUser = document.createElement('span')
        let spanMessage = document.createElement('span')
        let pDate = document.createElement('p')
        let msg = elem.message;
        let user = elem.username;
        let dateStamp = elem.created_at;
        let date = dateStamp.toDate();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        spanUser.innerHTML=`${user}: `
        spanUser.style.fontWeight = "bold"
        spanMessage.innerHTML=msg;
        pDate.innerHTML=`${day}.${month+1}.${year} - ${hours}:${minutes}`
        div.append(spanUser);
        div.append(spanMessage);
        div.append(pDate);
        li.append(div);
        this.ul.append(li);
        if (spanUser.innerHTML.includes(localStorage.getItem('username'))) {
            spanUser.parentElement.setAttribute('class', 'homeMessage')
        }

    }
}

