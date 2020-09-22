
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
        let pDate = document.createElement('p');
        let pDateToday = document.createElement('p');
        let msg = elem.message;
        let user = elem.username;
        let dateStamp = elem.created_at;
        let date = dateStamp.toDate();
        let currentDate = new Date();
        let dayToday = currentDate.getDate();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        var arrayOfRows = msg.split("\n");
        spanUser.innerHTML=`${user}: `
        spanUser.style.fontWeight = "bold"
        arrayOfRows.forEach(row => {
            spanMessage.innerHTML+=`<span class="rowSpan">${row}</span>`;
        })
        
        pDate.innerHTML=`${day}.${month+1}.${year} - ${hours}:${minutes}`
        pDateToday.innerHTML=`${hours}:${minutes}`;
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
            spanUser.parentElement.scrollIntoView({behavior: "smooth"});
        }

    }
}

