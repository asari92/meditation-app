export type Mood = 'calm' | 'tired' | 'energy';

export const calmAffirmations: string[] = [
    "You are allowed to move through this day gently.",
    "Calm lives in you more deeply than the noise around you.",
    "You do not need to rush to be enough.",
    "Peace can begin with one slow breath.",
    "Your softness is not weakness. It is balance.",
    "You can let this moment be simple.",
    "Stillness is already doing something for you.",
    "You are safe to slow down.",
    "You can trust the quiet parts of yourself.",
    "There is no need to force what can unfold gently.",
    "You are grounded, even when the world feels loud.",
    "Your calm is a strength you can return to.",
    "This moment does not need to be perfect to be peaceful.",
    "You can choose ease without guilt.",
    "Your breath can bring you back to yourself.",
    "You are allowed to take up space in silence.",
    "Peace is not far away. It begins within you.",
    "You can release what is not yours to carry.",
    "Calm is available to you right now.",
    "You can soften without falling apart.",
    "You do not need to solve everything in this moment.",
    "A steady heart can guide you through a busy day.",
    "You are more centered than you think.",
    "It is okay to let your body relax.",
    "You can return to your own rhythm.",
    "Quiet confidence looks good on you.",
    "You are allowed to pause before the next step.",
    "Even small moments of peace matter.",
    "You can let the tension leave little by little.",
    "Your inner balance is worth protecting.",
    "You can be calm and still be powerful.",
    "It is enough to be present right now.",
    "You are not behind. You are simply here.",
    "Your nervous system deserves kindness.",
    "Peace grows when you stop fighting yourself.",
    "You can make room for ease today.",
    "A softer pace is still progress.",
    "You can let yourself settle.",
    "There is wisdom in your quiet.",
    "You are allowed to feel steady and clear.",
    "You do not need urgency to have value.",
    "Your calm can shape the rest of your day.",
    "You can breathe deeper into trust.",
    "A gentle mind can still do meaningful things.",
    "Your peace does not need permission.",
    "You can stay rooted in yourself.",
    "This is a good moment to unclench.",
    "You are capable of choosing calm again and again.",
    "You can meet today with steadiness.",
    "Your calm is enough for today."
];

export const tiredAffirmations: string[] = [
    "You are allowed to rest without earning it first.",
    "Small steps still count, especially today.",
    "Your tiredness is not a personal failure.",
    "You do not need to do everything at once.",
    "It is okay to move slowly right now.",
    "You can be gentle with yourself and still make progress.",
    "Rest is part of the work, not the opposite of it.",
    "You deserve softness on hard days.",
    "You can lower the pressure and keep going.",
    "This moment asks for kindness, not force.",
    "You are doing enough for this version of today.",
    "Even a quiet effort is still effort.",
    "You do not have to push through everything.",
    "Your energy can return in waves. Let it.",
    "Being tired does not make you weak.",
    "You can care for yourself without apology.",
    "One breath, one task, one step is enough.",
    "You are allowed to recover in the middle of the day.",
    "Your body is asking for support, not punishment.",
    "Today can be lighter than yesterday.",
    "You can take things one gentle choice at a time.",
    "Your worth does not shrink when your energy does.",
    "You do not need to be at full power to matter.",
    "A slower pace is still a valid pace.",
    "You can release the need to be endlessly productive.",
    "This is a day for compassion toward yourself.",
    "You are not lazy. You are human.",
    "You can honor your limits and still move forward.",
    "It is enough to do what you can from where you are.",
    "Your tired mind deserves patience.",
    "You can rest and remain responsible to yourself.",
    "Not every day needs to be a performance.",
    "You are allowed to protect your energy.",
    "Gentle effort is still effort.",
    "You can begin again without rushing.",
    "Today may call for softness, and that is okay.",
    "You can choose care over criticism.",
    "A quiet reset can change everything.",
    "You do not have to prove your exhaustion to deserve rest.",
    "Your pace can be tender today.",
    "You are carrying a lot, and that matters.",
    "Let this be a day of smaller expectations.",
    "You can take a pause without falling behind.",
    "Even now, you are still moving.",
    "You are allowed to breathe before the next demand.",
    "Your body deserves cooperation, not control.",
    "A little rest can be a powerful decision.",
    "It is okay if today looks different than planned.",
    "You can meet yourself with mercy.",
    "Take this moment gently. Small steps still count."
];

export const energyAffirmations: string[] = [
    "Your energy has direction when you choose it.",
    "You already have what you need to begin.",
    "Momentum grows with action, not perfection.",
    "You can move forward with confidence and clarity.",
    "Your spark is real. Trust it.",
    "You are ready to turn intention into motion.",
    "Power can feel calm and focused in you.",
    "You can start before you feel completely ready.",
    "Today is a good day to back yourself.",
    "Your courage increases when you use it.",
    "You can channel your energy into something meaningful.",
    "You are capable of making strong moves today.",
    "Confidence can begin with one clear decision.",
    "Your drive does not need permission.",
    "You are allowed to take up space with purpose.",
    "Action creates its own motivation.",
    "You can trust your next step.",
    "Your energy is here to support you, not overwhelm you.",
    "You have enough fire to move this forward.",
    "A bold start can be simple.",
    "You can use this moment to create momentum.",
    "Your focus is stronger than your doubt.",
    "You are not waiting for power. You are using it.",
    "Forward is available to you now.",
    "You can bring intensity without losing balance.",
    "Your ideas deserve movement.",
    "This is a good time to act on what matters.",
    "You can lead yourself through this day.",
    "Your confidence grows every time you begin.",
    "You are capable of real progress right now.",
    "Your energy can become structure and action.",
    "You can move with purpose instead of pressure.",
    "Strong does not mean rushed. Strong means directed.",
    "You are allowed to want more and pursue it.",
    "Your next move can be clean and confident.",
    "You can turn excitement into execution.",
    "You are closer than you think once you begin.",
    "Your ambition can be grounded and powerful.",
    "You can trust yourself to handle what comes next.",
    "This is momentum. Let yourself use it.",
    "You do not need a perfect plan to start moving.",
    "Your energy can open doors when you focus it.",
    "You are built to take action, one step at a time.",
    "There is strength in your willingness to begin.",
    "You can bring your full presence to this moment.",
    "Your effort today can change the shape of tomorrow.",
    "You have enough clarity for the next step.",
    "You can act with boldness and intelligence.",
    "Your momentum is already building.",
    "You already have momentum. Start with one confident step."
];

export function getRandomFallbackAffirmation(mood: Mood): string {
    console.log(`[FALLBACK] Using fallback affirmation for mood: ${mood}`);

    let source: string[];

    switch (mood) {
        case 'calm':
            source = calmAffirmations;
            break;
        case 'tired':
            source = tiredAffirmations;
            break;
        case 'energy':
            source = energyAffirmations;
            break;
        default:
            console.log(`[FALLBACK] Unknown mood: ${mood}, using default affirmation`);
            return "Take a breath. You are doing better than you think.";
    }

    const randomIndex = Math.floor(Math.random() * source.length);
    const affirmation = source[randomIndex];
    console.log(`[FALLBACK] Selected fallback affirmation: "${affirmation}"`);
    return affirmation;
}