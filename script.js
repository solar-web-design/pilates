const scheduleData = {
    "Mon": [
        { time: "09:00", name: "Morning Flow (Reformer)", instructor: "김지수", status: "open" },
        { time: "11:00", name: "Core Align (Chair)", instructor: "이민호", status: "full" },
        { time: "19:00", name: "Evening Stretch", instructor: "박서연", status: "open" },
        { time: "20:30", name: "Intensive Burn", instructor: "김지수", status: "open" }
    ],
    "Tue": [
        { time: "10:00", name: "Basic Reformer", instructor: "박서연", status: "open" },
        { time: "12:00", name: "Lunch Express", instructor: "김지수", status: "open" },
        { time: "19:30", name: "Men's Pilates", instructor: "이민호", status: "open" }
    ],
    "Wed": [
         { time: "07:00", name: "Early Bird Flow", instructor: "이민호", status: "open" },
         { time: "18:30", name: "Post-Work Relax", instructor: "박서연", status: "full" }
    ],
    "Thu": [
        { time: "09:00", name: "Barre Pilates", instructor: "김지수", status: "open" },
        { time: "20:00", name: "Full Body Tone", instructor: "이민호", status: "open" }
    ],
    "Fri": [
        { time: "10:00", name: "Friday Detox", instructor: "박서연", status: "open" },
        { time: "17:00", name: "Happy Hour Flow", instructor: "김지수", status: "open" }
    ],
    "Sat": [
        { time: "10:00", name: "Weekend Warrior", instructor: "이민호", status: "full" },
        { time: "11:30", name: "Beginner Workshop", instructor: "박서연", status: "open" }
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
            navbar.style.background = 'rgba(18, 18, 18, 0.95)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.background = 'rgba(18, 18, 18, 0.8)';
            navbar.style.padding = '20px 0';
        }
    });
});
