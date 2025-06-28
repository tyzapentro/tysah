document.addEventListener('DOMContentLoaded', function() {
    // Установка минимальной даты (завтра)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('appointmentDate').min = tomorrow.toISOString().split('T')[0];
    
    document.getElementById('regForm').addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        let isValid = true;
        
        // Валидация ФИО
        const name = document.getElementById('fullName').value.trim();
        if(!name) {
            showError('nameError', 'Поле обязательно для заполнения');
            isValid = false;
        } else if(!/^[А-Яа-яЁё\s]+$/.test(name)) {
            showError('nameError', 'Только кириллица');
            isValid = false;
        }
        
        // Валидация даты рождения
        const birthDate = document.getElementById('birthDate').value;
        if(!birthDate) {
            showError('dateError', 'Укажите дату рождения');
            isValid = false;
        } else if(new Date(birthDate) > new Date('2006-01-01')) {
            showError('dateError', 'До 2006 года');
            isValid = false;
        }
        
        // Валидация телефона
        const phone = document.getElementById('phone').value.trim();
        if(!phone) {
            showError('phoneError', 'Введите номер телефона');
            isValid = false;
        } else if(!/^\d{11}$/.test(phone)) {
            showError('phoneError', 'Ровно 11 цифр');
            isValid = false;
        }
        
        // Валидация даты бронирования
        const appDate = document.getElementById('appointmentDate').value;
        if(appDate && new Date(appDate) < tomorrow) {
            showError('appDateError', 'Не ранее завтра');
            isValid = false;
        }
        
        // Валидация времени бронирования
        const appTime = document.getElementById('appointmentTime').value;
        if(appTime) {
            const [hours, minutes] = appTime.split(':').map(Number);
            if(hours < 8 || hours > 22 || (hours === 22 && minutes > 0)) {
                showError('appTimeError', '8:00 - 22:00');
                isValid = false;
            }
        }
        
        if(isValid) {
            alert('Регистрация успешна!');
            // this.submit();
        }
    });
    
    function showError(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.previousElementSibling.previousElementSibling.style.borderColor = '#d32f2f';
    }
    
    function clearErrors() {
        document.querySelectorAll('.error').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelectorAll('input').forEach(input => {
            input.style.borderColor = '#e0e0e0';
        });
    }
});