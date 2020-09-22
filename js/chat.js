export class Chatroom{
    constructor(a, b){
        this.room = a;
        this.username = b;
        this.chats = db.collection('chats');
        this.unsub;
    }
    set room(r) {
        this._room = r;
    }
    set username(u) {
        if(!/\S/.test(u))  {
            alert('username ne moze biti prazno polje')
        } else if (u.length < 3 || u.length > 10) {
            alert('username mora biti izmedju 2 i 10 karaktera')
            
        } else {
            this._username = u;
        }
    }
    get room() {
        return this._room;
    }
    get username() {
        return this._username;
    }
    updateUsarname(name) {
        this.username = name;
    }
    updateRoom(name) {
        this.room = name;
        if (this.unsub) {
             this.unsub();
        }
        
    }
    addChat(mess) {
        let date = new Date();
        let obj = {
            message: mess,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(date)
        }
        db.collection("chats").doc().set(obj).then(() => console.log('Uspesno dodat chat!'))
        .catch(e => console.log('neka greska', e));
    };
    getChats(callback) {
        this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at', 'asc')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                 if (change.type == 'added') {
                    callback(change.doc.data())                    
                 }
                
            });
        });
    }
};




