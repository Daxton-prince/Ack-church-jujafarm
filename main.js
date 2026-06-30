// Sample events data
const events = [
    {
        id: 1,
        title: "Sunday Worship Service",
        date: "2024-01-14",
        category: "sunday",
        description: "Join us for a powerful worship service with Pastor John. Theme: 'Walking in Faith'",
        image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400",
        attendees: 245
    },
    {
        id: 2,
        title: "Bible Study: Book of Romans",
        date: "2024-01-16",
        category: "bible-study",
        description: "Deep dive into the Book of Romans with interactive discussions",
        image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400",
        attendees: 89
    },
    {
        id: 3,
        title: "All Night Prayer",
        date: "2024-01-19",
        category: "prayer",
        description: "Midnight prayer session for church revival and community needs",
        image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=400",
        attendees: 156
    },
    {
        id: 4,
        title: "Youth Conference 2024",
        date: "2024-01-20",
        category: "special",
        description: "Annual youth conference with guest speakers and worship team",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400",
        attendees: 320
    }
];

// DOM Elements
const eventsGrid = document.getElementById('eventsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('eventModal');
const addEventBtn = document.getElementById('addEventBtn'); // You'll need to add this button

// Current filter and search state
let currentFilter = 'all';
let searchTerm = '';

// Display events
function displayEvents() {
    const filteredEvents = events.filter(event => {
        // Filter by category
        if (currentFilter !== 'all' && event.category !== currentFilter) {
            return false;
        }
        
        // Filter by search term
        if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !event.description.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        
        return true;
    });

    if (filteredEvents.length === 0) {
        eventsGrid.innerHTML = '<p class="no-events">No events found matching your criteria.</p>';
        return;
    }

    eventsGrid.innerHTML = filteredEvents.map(event => `
        <div class="event-card" data-category="${event.category}">
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-info">
                <span class="event-category">${formatCategory(event.category)}</span>
                <h3 class="event-title">${event.title}</h3>
                <div class="event-date">
                    <span>📅 ${formatDate(event.date)}</span>
                    <span>👥 ${event.attendees} attending</span>
                </div>
                <p class="event-description">${event.description}</p>
                <a href="#" class="read-more">View Details →</a>
            </div>
        </div>
    `).join('');
}

// Helper function to format category
function formatCategory(category) {
    const categories = {
        'sunday': 'Sunday Service',
        'bible-study': 'Bible Study',
        'prayer': 'Prayer Meeting',
        'special': 'Special Event'
    };
    return categories[category] || category;
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Filter event listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update current filter
        currentFilter = button.dataset.filter;
        
        // Refresh display
        displayEvents();
    });
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    displayEvents();
});

// Modal functionality (optional - for adding new events)
if (modal) {
    const closeBtn = document.querySelector('.close');
    
    // Close modal when clicking X
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Handle form submission
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send data to a server
            alert('Event saved successfully!');
            modal.style.display = 'none';
            eventForm.reset();
        });
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayEvents();
    
    // Add animation to cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    document.querySelectorAll('.event-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
});

// Optional: Add real-time updates simulation
setInterval(() => {
    // Simulate new events being added
    console.log('Checking for new events...');
}, 60000); // Check every minute