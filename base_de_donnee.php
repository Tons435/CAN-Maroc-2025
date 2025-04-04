

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Liste des matchs</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        
        <h1>CAN 2025 - Équipes</h1> 
        <nav>
            <ul>
                <li><a href="index.html">Accueil</a></li>
                <li><a href="equipes.html">Équipes</a></li>
                <li><a href="base_de_donnee.php">Programmes des matchs</a></li>
                <li><a href="carte.html">Carte Interactive</a></li>
            </ul>
        </nav>
    </header>
    <?php
$host = 'postgresql-thiam.alwaysdata.net';
$dbname = 'thiam_can';
$username = 'thiam';
$password = 'Tons2150@';
$bdd = "pgsql:host=$host;port=5432;dbname=$dbname;user=$username;password=$password";
try {
    $conn = new PDO($bdd);
    if ($conn) {
        echo "Connecté à $dbname avec succès!";
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}

$result = $conn->query('SELECT * FROM "public"."Programmes_matchs"');
$matchs = $result->fetchAll(PDO::FETCH_ASSOC);

$paysUniques = [];
$datesUniques = [];
foreach ($matchs as $row) {
    $pays = explode(' - ', $row['Match']);
    foreach ($pays as $p) {
        $paysUniques[$p] = true;
    }
    $datesUniques[$row['Date']] = true;
}
$paysUniques = array_keys($paysUniques);
$datesUniques = array_keys($datesUniques);

$selectedPays = isset($_POST['pays']) ? $_POST['pays'] : null;
$selectedDate = isset($_POST['date']) ? $_POST['date'] : null;

$matchsFiltres = [];
foreach ($matchs as $row) {
    if (($selectedPays && strpos($row['Match'], $selectedPays) === false) ||
        ($selectedDate && $row['Date'] != $selectedDate)) {
        continue;
    }
    $matchsFiltres[] = $row;
}
?>
    <h1>Liste des matchs</h1>
    <form method="POST">
        <label for="pays">Sélectionnez un pays :</label>
        <select name="pays" id="pays">
            <option value="">-- Choisissez un pays --</option>
            <?php foreach ($paysUniques as $p): ?>
                <option value="<?php echo $p; ?>" <?php echo ($selectedPays == $p) ? 'selected' : ''; ?>><?php echo $p; ?></option>
            <?php endforeach; ?>
        </select>
        
        <label for="date">Sélectionnez une date :</label>
        <select name="date" id="date">
            <option value="">-- Choisissez une date --</option>
            <?php foreach ($datesUniques as $d): ?>
                <option value="<?php echo $d; ?>" <?php echo ($selectedDate == $d) ? 'selected' : ''; ?>><?php echo $d; ?></option>
            <?php endforeach; ?>
        </select>
        
        <button type="submit">Filtrer</button>
    </form>

    <?php if ($selectedPays || $selectedDate): ?>
        <h2>Matchs <?php echo $selectedPays ? "pour $selectedPays" : ""; ?> <?php echo $selectedDate ? "le $selectedDate" : ""; ?></h2>
        <table border="1">
            <tr><th>Match</th><th>Date</th><th>Stade</th><th>Ville</th></tr>
            <?php foreach ($matchsFiltres as $row): ?>
                <tr>
                    <td><?php echo $row['Match']; ?></td>
                    <td><?php echo $row['Date']; ?></td>
                    <td><?php echo $row['Stade']; ?></td>
                    <td><?php echo $row['Ville']; ?></td>
                </tr>
            <?php endforeach; ?>
        </table>
    <?php endif; ?>
    <footer>
        <p>&copy; FALLE THIAM - 2025 CAN Maroc. Tous droits réservés.</p>
        <div class="bande-defilante">
            <marquee behavior="scroll" direction="left">
                🏆 CAN 2025 au Maroc : Du 21 décembre 2025 au 18 janvier 2026 | ⚽ 24 équipes en compétition | 📍 9 stades dans 6 villes | SN Le Sénégal grand favori !
            </marquee>
        </div>
        
    </footer>
</body>
</html>
