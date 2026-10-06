document.addEventListener('DOMContentLoaded', () => {
    const counterDisplay = document.getElementById('counter');
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');
    const resetBtn = document.getElementById('reset-btn');
    const statusLine = document.getElementById('last-action');

    let count = 0;

    // Load persisted count
    const savedCount = localStorage.getItem('coordinator-count');
    if (savedCount !== null) {
        count = parseInt(savedCount, 10);
        if (isNaN(count) || count < 0) {
            count = 0;
        }
    }
    updateDisplay();

    function updateDisplay() {
        counterDisplay.textContent = count;
        localStorage.setItem('coordinator-count', count);
    }

    function updateStatus(action) {
        statusLine.textContent = `Last action: ${action}`;
    }

    function increment() {
        count++;
        updateDisplay();
        updateStatus('Increment');
    }

    function decrement() {
        if (count > 0) {
            count--;
            updateDisplay();
            updateStatus('Decrement');
        }
    }

    function reset() {
        count = 0;
        updateDisplay();
        updateStatus('Reset');
    }

    // Button event listeners
    incrementBtn.addEventListener('click', increment);
    decrementBtn.addEventListener('click', decrement);
    resetBtn.addEventListener('click', reset);

    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        // Ignore key presses if user is typing in an input field (not relevant here, but good practice)
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;

        if (event.key === '+') {
            increment();
        } else if (event.key === '-') {
            decrement();
        } else if (event.key.toLowerCase() === 'r') {
            reset();
        }
    });
});
