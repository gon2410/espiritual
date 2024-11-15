window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        emailjs.sendForm('service_1fyn8lr', 'template_gvdvs3b', this)
            .then(() => {
                console.log('SUCCESS!');
                alert("Message sent!")
            }, (error) => {
                console.log('FAILED...', error);
                alert("Something went wrong, try again.")
            });
    });
}