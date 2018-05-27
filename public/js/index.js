var socket = io();

socket.on('connect', () => {
    console.log('Connected!');
});

socket.on('disconnect', () => {
    console.log('Disconnected');
});

socket.on('newMessage', (message) => {
    var li = document.createElement('li');
    $(li).text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
    $('#message').val('');
});

socket.on('newLocationMessage', (message) => {
    var li = document.createElement('li');
    $(li).html(`${message.from}: <a href="${message.url}" target="_blank">My Location</a>`);

    $('#messages').append(li);
    $('#message').val('');
});

$('#form-message').on('submit', function(e) {
    e.preventDefault();

    var message = $('#message').val();

    socket.emit('createMessage', {
        from: 'User',
        text: message
    });
});


$('#btnSendLocation').on('click', function() {
    if(!navigator.geolocation)
    {
        return alert('Get location not supported');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        socket.emit('createLocationMessage', {
            from: 'User',
            longtuide: position.coords.longitude,
            latitude: position.coords.latitude
        });
    });
}); 

