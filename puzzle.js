document.querySelectorAll('.car').forEach(car => {
    car.addEventListener('mousedown', onMouseDown);

    function onMouseDown(e) {
        const carRect = car.getBoundingClientRect();
        const offsetX = e.clientX - carRect.left;
        const offsetY = e.clientY - carRect.top;

        function onMouseMove(e) {
            let left = e.clientX - offsetX;
            let top = e.clientY - offsetY;

            // Ensure the car stays within the grid (this is a basic check, you'll refine this later)
            left = Math.max(0, Math.min(left, car.parentElement.offsetWidth - car.offsetWidth));
            top = Math.max(0, Math.min(top, car.parentElement.offsetHeight - car.offsetHeight));

            car.style.left = `${left}px`;
            car.style.top = `${top}px`;
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
});
