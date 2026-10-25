# CS624-PE03-TejeswiniKolluri

# Input

TaskFlow accepts task descriptions. The user selects Low, Medium, or High priority and presses Add Task. Each task object contains an ID, title, completion status, and priority. Tasks are stored in a React state array.

# Process

When a task is submitted, the app checks that the input is not empty, creates a task object, and adds it to the array. Updating state refreshes the screen. Users can mark tasks complete, delete tasks, or filter the list to show all, completed, or incomplete tasks. The app calculates task totals and updates its progress bar. Console messages display task additions, array changes, filtering, completion, and deletion.

# Output

The screen displays task cards, priority labels, summary counts, and progress. Empty-state messages appear when a filter has no matching tasks. The terminal or console shows debugging information. Tasks remain in memory and are not saved after restarting the app.