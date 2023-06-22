//FRONT
const socket = io();
let correoDelUsuario = '';

async function pedirEmail() {
  const { value: nombre } = await Swal.fire({
    title: 'Enter your mail',
    input: 'text',
    inputLabel: 'Your mail',
    inputValue: '',
    showCancelButton: false,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write your mail!';
      }
    },
  });

  correoDelUsuario = nombre;
}

pedirEmail();

//FRONT EMITE

const chatBox = document.getElementById('chat-box');

chatBox.addEventListener('keyup', ({ key }) => {
  if (key == 'Enter') {
    socket.emit('msg_front_to_back', {
      user: correoDelUsuario,
      message: chatBox.value,
    });
    chatBox.value = '';
  }
});

//FRONT RECIBE
socket.on('msg_back_to_front', (msgs) => {
  console.log(msgs);
  let msgsFormateados = '';
  msgs.forEach((msg) => {
    msgsFormateados += "<div style='border: 1px solid red;'>";
    msgsFormateados += '<p>' + msg.user + '</p>';
    msgsFormateados += '<p>' + msg.message + '</p>';
    msgsFormateados += '</div>';
  });
  const divMsgs = document.getElementById('div-msgs');
  divMsgs.innerHTML = msgsFormateados;
});
