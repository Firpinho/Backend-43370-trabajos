const socket = io("/chat");

let username = null;

if(!username) {
    Swal.fire({
        title: '¡Welcome to chat!',
        text: 'Insert your username',
        input: 'text',
        inputValidator: (value) =>{
            if(!value) return 'Your username is required'
        }
    })
    .then((input)=>{
        username = input.value;
    })
}



const sendMessage = () => {
    const message = document.getElementById('input').value
    socket.emit('products:newMessage', {user: username, message})
    document.getElementById('input').value = ""
}   

socket.on('messages', (messages)=>{
    document.getElementById('chatBox').innerHTML = ''
    const chatRender = messages.map((msg)=>{
        return `<p><strong>${msg.user}</strong>: ${msg.message}</p>`
    }).join(' ')
    document.getElementById('chatBox').innerHTML = chatRender
})