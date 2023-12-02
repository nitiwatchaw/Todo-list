// add
export const handleSubmit = async (todo, userId, completed, navigate) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (todo.trim('') === "" || userId.trim('') === "") {
        alert("Please fill all fields");
    } else {
        var raw = JSON.stringify({
            "todo": todo,
            "completed": completed,
            "userId": userId
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            const response = await fetch("http://localhost:3001/todos", requestOptions);
            const result = await response.json();
            alert(`Todo added: ${result.todo}`);
            // go back page
            navigate(-1);
        } catch (error) {
            console.error('Error:', error);
        }
    }
};
// delete
export const handleDelete = async (id) => {
    var raw = "";

    var requestOptions = {
        method: 'DELETE',
        body: raw,
        redirect: 'follow'
    };
    const shouldDelete = window.confirm('Are you sure you want to delete this todo?');

    if (!shouldDelete) {
        // User canceled the deletion
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/todos/${id}`, requestOptions);
        await response.json();
        alert(`Deleted todo with number ${id}`);
    }
    catch (error) {
        console.error('Error:', error);
    }
}
//update

export const handleUpdate = async (todo, userId, completed, modalId, toggleModal) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "todo": todo,
        "completed": completed,
        "userId": userId
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    try {
        const response = await fetch(`http://localhost:3001/todos/${modalId}`, requestOptions);
        const result = await response.json();
        alert(`Todo update: ${result.id}`);
        // go back page
        toggleModal()
    } catch (error) {
        console.error('Error:', error);
    }

}