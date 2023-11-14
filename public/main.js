const update = document.querySelector('#update-button');

update.addEventListener('click', async () => {
    try {
        const response = await fetch('/quotes', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Darth Vader',
                quote: 'I find your lack of faith disturbing.',
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update quote');
        }

      // Reload the page to reflect the changes
      location.reload();
  } catch (error) {
      console.error('Error updating quote:', error);
  }
});


const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('click', async () => {
  try {
      const response = await fetch('/quotes', {
          method: 'delete',
          headers: {'Content-Type': 'application/json'}
      });

      if (!response.ok) {
          throw new Error('Failed to delete quote');
      }

    // Reload the page to reflect the changes
    location.reload();
} catch (error) {
    console.error('Error updating quote:', error);
}
});




const messageDiv = document.querySelector('#message');

deleteButton.addEventListener('click', async () => {
  try {
    const response = await fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (response.status === 404) {
        messageDiv.textContent = 'No Darth Vader quote to delete';
      } else {
        throw new Error('Failed to delete quote');
      }
    } else {
      window.location.reload(true);
    }
  } catch (error) {
    console.error('Error deleting quote:', error);
  }
});