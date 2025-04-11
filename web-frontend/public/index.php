<?php
function fetch_data($url) {
    $response = file_get_contents($url);
    return json_decode($response, true);
}

$users = fetch_data('http://user-service:3000/users');
$tasks = fetch_data('http://task-service:4000/tasks');
?>

<!DOCTYPE html>
<html>
<head>
    <title>ToDo List</title>
</head>
<body>
    <h1>Utilisateurs</h1>
    <ul>
        <?php foreach ($users as $user): ?>
            <li><?php echo $user['name']; ?></li>
        <?php endforeach; ?>
    </ul>
    <h1>Tâches</h1>
    <ul>
        <?php foreach ($tasks as $task): ?>
            <li><?php echo $task['title']; ?> - <?php echo $task['completed'] ? 'Terminé' : 'En cours'; ?></li>
        <?php endforeach; ?>
    </ul>
</body>
</html>

