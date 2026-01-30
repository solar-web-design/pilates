const scheduleData = {
    "Mon": [
        { time: "09:00", name: "Morning Flow (Reformer)", instructor: "Lily", status: "open" },
        { time: "11:00", name: "Core Align (Chair)", instructor: "Bella", status: "full" },
        { time: "19:00", name: "Evening Stretch", instructor: "Zoey", status: "open" },
        { time: "20:30", name: "Intensive Burn", instructor: "Lily", status: "open" }
    ],
    "Tue": [
        { time: "10:00", name: "Basic Reformer", instructor: "Zoey", status: "open" },
        { time: "12:00", name: "Lunch Express", instructor: "Lily", status: "open" },
        { time: "19:30", name: "Men's Pilates", instructor: "Bella", status: "open" }
    ],
    "Wed": [
        { time: "07:00", name: "Early Bird Flow", instructor: "Bella", status: "open" },
        { time: "18:30", name: "Post-Work Relax", instructor: "Zoey", status: "full" }
    ],
    "Thu": [
        { time: "09:00", name: "Barre Pilates", instructor: "Lily", status: "open" },
        { time: "20:00", name: "Full Body Tone", instructor: "Bella", status: "open" }
    ],
    "Fri": [
        { time: "10:00", name: "Friday Detox", instructor: "Zoey", status: "open" },
        { time: "17:00", name: "Happy Hour Flow", instructor: "Lily", status: "open" }
    ],
    "Sat": [
        { time: "10:00", name: "Weekend Warrior", instructor: "Bella", status: "full" },
        { time: "11:30", name: "Beginner Workshop", instructor: "Zoey", status: "open" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Timetable Logic
    const dayBtns = document.querySelectorAll('.day-btn');
    const scheduleDisplay = document.getElementById('schedule-display');

    function renderSchedule(day) {
        // 1. Fade out
        scheduleDisplay.style.opacity = '0';

        // 2. Wait for transition to finish (300ms matches CSS)
        setTimeout(() => {
            // 3. Update content
            scheduleDisplay.innerHTML = '';
            const classes = scheduleData[day] || [];

            if (classes.length === 0) {
                scheduleDisplay.innerHTML = '<div class="class-item" style="justify-content:center; color:#888;">휴관일입니다.</div>';
            } else {
                classes.forEach(cls => {
                    const statusClass = cls.status === 'full' ? 'status-full' : 'status-open';
                    const statusText = cls.status === 'full' ? '마감' : '예약가능';

                    const html = `
                        <div class="class-item">
                            <div class="class-time">${cls.time}</div>
                            <div class="class-info">
                                <h4>${cls.name}</h4>
                                <p>with ${cls.instructor}</p>
                            </div>
                            <div class="class-status ${statusClass}">${statusText}</div>
                        </div>
                    `;
                    scheduleDisplay.insertAdjacentHTML('beforeend', html);
                });
            }

            // 4. Fade in
            scheduleDisplay.style.opacity = '1';
        }, 300);
    }

    dayBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            dayBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            // Render
            renderSchedule(btn.dataset.day);
        });
    });

    // Initialize with Monday
    renderSchedule("Mon");

    // Scroll Effect for Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Modal Logic ---
    const modal = document.getElementById('reservation-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalForm = document.getElementById('modal-form');
    // Select all "Book Now" buttons (nav and hero)
    const bookBtns = document.querySelectorAll('a[href="#contact"], a[href="#timetable"]');

    // 1. Open Modal function
    function openModal(className = '') {
        modal.style.display = 'flex';
        const hiddenInput = document.getElementById('modal-class-name');
        if (hiddenInput) {
            hiddenInput.value = className;
        }
    }

    // 2. Close Modal function
    function closeModal() {
        modal.style.display = 'none';
    }

    // 3. Event Listeners for Nav/Hero Buttons
    // Note: The original links go to #contact, but user wants modal.
    // We can intercept the click or let them scroll. User said "Book Now" button.
    // Let's attach to specifically elements with class 'btn-primary' who are links, or just intercept #contact links?
    // "상단의 Book Now 버튼" -> Nav link
    const navBookBtn = document.querySelector('.nav-links .btn-primary');
    if (navBookBtn) {
        navBookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('General Inquiry');
        });
    }

    // 4. Event Delegation for Timetable "예약가능" buttons
    scheduleDisplay.addEventListener('click', (e) => {
        if (e.target.classList.contains('status-open')) {
            // Traverse up to find class name if needed, or just open generic
            const classItem = e.target.closest('.class-item');
            const className = classItem ? classItem.querySelector('h4').textContent : 'Timetable Class';
            openModal(className);
        }
    });

    // 5. Close Button
    closeBtn.addEventListener('click', closeModal);

    // 6. Click Outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 7. Form Submission
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('예약 신청이 완료되었습니다! 담당자가 곧 연락드리겠습니다.');
        closeModal();
        modalForm.reset();
    });
});
