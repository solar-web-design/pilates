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
        // Clear current content
        scheduleDisplay.innerHTML = '';
        
        // Add animation class trigger logic (optional)
        scheduleDisplay.style.opacity = '0';
        
        setTimeout(() => {
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
            
            scheduleDisplay.style.opacity = '1';
        }, 200);
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
});
