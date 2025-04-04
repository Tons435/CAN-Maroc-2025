document.addEventListener("DOMContentLoaded", function () {
    const playPauseButton = document.getElementById("play-pause-button");
    const playIcon = document.getElementById("play-icon");
    const pauseIcon = document.getElementById("pause-icon");
    const currentTimeDisplay = document.getElementById("current-time");
    const remainingTimeDisplay = document.getElementById("remaining-time");
    const progressBar = document.getElementById("progress-bar");
    const durationDisplay = document.getElementById("duration");

    let speech;
    let startTime;
    let timerInterval;
    let isPlaying = false;
    let totalDuration = 0; // Durée totale de la parole

    // Fonction pour formater le temps en minutes:secondes
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00"; // Gérer les cas où seconds est NaN
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Fonction pour démarrer le chronomètre
    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            const remainingTime = totalDuration - elapsedTime;

            // Mettre à jour les affichages
            currentTimeDisplay.textContent = formatTime(elapsedTime);
            remainingTimeDisplay.textContent = `-${formatTime(remainingTime)}`;
            durationDisplay.textContent = formatTime(totalDuration);

            // Mettre à jour la barre de progression
            if (totalDuration > 0) {
                progressBar.value = (elapsedTime / totalDuration) * 100;
            }
        }, 1000);
    }

    // Fonction pour arrêter le chronomètre
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Gestionnaire d'événement pour le bouton Play/Pause
    playPauseButton.addEventListener("click", function () {
        if (!isPlaying) {
            // Arrêter toute parole en cours
            window.speechSynthesis.cancel();

            // Créer une nouvelle instance de SpeechSynthesisUtterance
            speech = new SpeechSynthesisUtterance(`
                Pour cette compétition à cheval sur deux ans, la CAF a prévu des jours de repos le 25 décembre et le 1er janvier.
                Les rencontres se dérouleront pour la première fois dans neuf stades répartis dans six villes. La capitale,
                Rabat, se taille la part du lion avec quatre stades hôtes. Retrouvez le calendrier complet de la CAN 2025.

                Elles connaissent leurs adversaires ! Les 24 équipes africaines sont désormais fixées sur le programme qui
                les attend lors de la phase finale de la Coupe d’Afrique des nations 2025 qui aura lieu au Maroc, du 21
                décembre 2025 au 18 janvier 2026. Le tirage au sort de l’épreuve a été effectué ce lundi lundi 27 janvier au théâtre Mohammed
                V de Rabat, la capitale du Maroc, par les anciennes stars du football Mustapha Hadji (Maroc), Serge Aurier
                (Côte d’Ivoire), Aliou Cissé (Sénégal) et Joseph Yobo (Nigeria). Le Ghana, éliminé en phase de poules, sera
                le grand absent de la compétition.

                Le Maroc, demi-finaliste de la Coupe du monde 2022, sera l’un des grands favoris de cette CAN 2025. Devant
                leur public, les Lions de l’Atlas tenteront de remporter, 50 ans après, un trophée qu’ils n’ont soulevé
                qu’une fois dans leur histoire, en 1976. Le Ghana, éliminé en phase de poules, sera le grand absent de la
                compétition.

                L’annonce par le Maroc des neuf stades retenus pour accueillir la phase finale de la Coupe d’Afrique des Nations 
                CAF TotalEnergies en décembre marque une avancée significative dans l’histoire du tournoi, augmentant considérablement le nombre d’enceintes utilisées depuis la première édition en 1957.

                Dix-huit pays ont accueilli la CAN, depuis le tournoi inaugural au Soudan jusqu’à la dernière édition en Côte d’Ivoire, 
                avec un total de 83 stades ayant servi de théâtre aux matchs de la phase finale. Avec l’édition marocaine, ce chiffre grimpera à 89.

                Le Complexe Sportif Prince Moulay Abdellah sera le centre névralgique de la compétition, en accueillant le match 
                d’ouverture, la finale et cinq autres rencontres. De son côté, le mythique Stade Mohammed V de Casablanca, qui fut le théâtre de la finale de 
                l’édition 1988 lorsque le Maroc avait organisé le tournoi, sera l’hôte de huit rencontres en 2025. Ce sera également le cas du Grand Stade d’Agadir et du Grand Stade de Marrakech.

                Avec 35 matchs répartis sur quatre éditions, dont quatre finales, le Stade International du Caire détient le record du plus grand nombre 
                de rencontres accueillies dans l’histoire du tournoi. Il est suivi par le Stade d’Accra (32 matchs), le Stade Baba Yara à Kumasi (26), le Stade d’Addis-Abeba (25) et le Stade Ahmadou Ahidjo à Yaoundé (21).

                e Stade de l’Amitié à Dakar détient le record du plus grand nombre de matchs disputés dans un même stade lors d’une seule édition, 
                avec 14 rencontres au programme de la CAN 1992 organisée au Sénégal. Quant au Stade Municipal de Khartoum, il a eu l’honneur d’accueillir 
                les premiers matchs de l’histoire de la Coupe d’Afrique des Nations.

                L’édition 2025 établit un nouveau standard avec neuf stades mobilisés, un record qui dépasse les six enceintes utilisées par le Mali lors de la CAN 2002, à l’époque disputée par 16 équipes sur 32 matchs.
                

                 
            `);

            // Trouver la voix française de Google
            const voices = speechSynthesis.getVoices();
            const frenchVoice = voices.find(voice => voice.name.includes("Google Français"));

            // Si la voix est trouvée, l'utiliser
            if (frenchVoice) {
                speech.voice = frenchVoice;
            } else {
                console.warn("La voix Google Français n'a pas été trouvée. Utilisation de la voix par défaut.");
            }

            // Événement pour obtenir la durée totale une fois que la parole commence
            speech.onstart = () => {
                totalDuration = Math.floor(speech.duration); // Durée totale en secondes
                if (isNaN(totalDuration)) {
                    totalDuration = 0; // Si la durée est NaN, la définir à 0
                }
                durationDisplay.textContent = formatTime(totalDuration); // Afficher la durée totale
                startTimer(); // Démarrer le chronomètre
            };

            // Lire le texte
            window.speechSynthesis.speak(speech);

            // Mettre à jour l'état du bouton
            playIcon.style.display = "none";
            pauseIcon.style.display = "block";
            isPlaying = true;

            // Arrêter le chronomètre lorsque la parole est terminée
            speech.onend = () => {
                stopTimer();
                playIcon.style.display = "block";
                pauseIcon.style.display = "none";
                isPlaying = false;
            };
        } else {
            // Mettre en pause ou reprendre
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
                startTimer();
                playIcon.style.display = "none";
                pauseIcon.style.display = "block";
            } else {
                window.speechSynthesis.pause();
                stopTimer();
                playIcon.style.display = "block";
                pauseIcon.style.display = "none";
            }
        }
    });

    // Gestionnaire d'événement pour la barre de progression
    progressBar.addEventListener("input", function () {
        if (speech && totalDuration > 0) {
            const seekTime = (progressBar.value / 100) * totalDuration;
            window.speechSynthesis.cancel();
            speech.currentTime = seekTime;
            window.speechSynthesis.speak(speech);
        }
    });
});