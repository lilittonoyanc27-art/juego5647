export interface DialogueLine {
  id: number;
  speaker: string;
  es: string;
  am: string;
}

export interface QuestionAnswer {
  id: number;
  questionEs: string;
  questionAm: string;
  answerEs: string;
  answerAm: string;
}

export interface ListeningExercise {
  id: number;
  situationEs: string;
  situationAm: string;
  promptQuestion?: string;
  promptQuestionAm?: string;
  options: {
    key: string;
    es: string;
    am?: string;
  }[];
  correctKey: string;
  tip?: {
    es: string;
    ru?: string;
    am?: string;
  };
}

export interface KeyPhrase {
  id: number;
  es: string;
  am: string;
  context?: string;
}

export interface LevelItem {
  id: number;
  level: number;
  levelTitle: string;
  levelBadge: string;
  dialogueEs: string[];
  dialogueAm: string[];
  questions: {
    questionEs?: string;
    questionAm?: string;
    options?: { key: string; text: string; correct: boolean }[];
    answerEs: string;
    answerAm?: string;
  }[];
  summaryAm?: string;
}

export interface BlitzItem {
  id: number;
  promptEs: string;
  promptAm: string;
  correctAnswerEs: string;
  correctAnswerAm: string;
  wrongAnswers: { es: string; am: string }[];
}

export const MAIN_DIALOGUE: DialogueLine[] = [
  {
    id: 1,
    speaker: "A",
    es: "—¿Has estudiado para el examen de Ciencias?",
    am: "—Դու սովորե՞լ ես բնագիտության քննության համար։",
  },
  {
    id: 2,
    speaker: "B",
    es: "—Sí, pero todavía tengo dudas con una parte.",
    am: "—Այո, բայց մի մասի վերաբերյալ դեռ հարցեր ունեմ։",
  },
  {
    id: 3,
    speaker: "A",
    es: "—¿Con cuál?",
    am: "—Ո՞ր մասի։",
  },
  {
    id: 4,
    speaker: "B",
    es: "—Con el tema de los ecosistemas. Entiendo qué es un ecosistema, pero me cuesta explicar la diferencia entre productores y consumidores.",
    am: "—Էկոհամակարգերի թեմայից։ Հասկանում եմ, թե ինչ է էկոհամակարգը, բայց ինձ համար դժվար է բացատրել արտադրողների և սպառողների տարբերությունը։",
  },
  {
    id: 5,
    speaker: "A",
    es: "—A mí también me costaba. Si quieres, lo repasamos juntos durante el recreo.",
    am: "—Ինձ համար էլ էր դժվար։ Եթե ուզում ես, դասամիջոցի ժամանակ միասին կրկնենք։",
  },
  {
    id: 6,
    speaker: "B",
    es: "—Vale. ¿Has traído tus apuntes?",
    am: "—Լավ։ Բերե՞լ ես քո գրառումները։",
  },
  {
    id: 7,
    speaker: "A",
    es: "—Sí, los tengo aquí. Además, hice un esquema ayer.",
    am: "—Այո, այստեղ են։ Բացի դրանից, երեկ սխեմա եմ կազմել։",
  },
  {
    id: 8,
    speaker: "B",
    es: "—Perfecto. ¿Me lo puedes enseñar?",
    am: "—Հիանալի է։ Կարո՞ղ ես ինձ ցույց տալ։",
  },
  {
    id: 9,
    speaker: "A",
    es: "—Claro. Mira, aquí están las plantas, que son los productores, y después los animales...",
    am: "—Իհարկե։ Նայի՛ր, այստեղ բույսերն են, որոնք արտադրողներն են, իսկ հետո՝ կենդանիները...",
  },
  {
    id: 10,
    speaker: "B",
    es: "—Ahora lo entiendo mejor.",
    am: "—Հիմա ավելի լավ եմ հասկանում։",
  },
  {
    id: 11,
    speaker: "A",
    es: "—Pues luego hacemos algunas preguntas para practicar.",
    am: "—Դե հետո մի քանի հարց անենք՝ վարժվելու համար։",
  },
  {
    id: 12,
    speaker: "B",
    es: "—Buena idea. Así vemos qué partes necesitamos repasar otra vez.",
    am: "—Լավ գաղափար է։ Այդպես կտեսնենք, թե որ մասերն է պետք նորից կրկնել։",
  },
];

export const MAIN_QUESTIONS: QuestionAnswer[] = [
  {
    id: 1,
    questionEs: "¿De qué asignatura es el examen?",
    questionAm: "Ո՞ր առարկայից է քննությունը։",
    answerEs: "El examen es de Ciencias.",
    answerAm: "Քննությունը բնագիտությունից է։",
  },
  {
    id: 2,
    questionEs: "¿Qué parte no entiende bien uno de los alumnos?",
    questionAm: "Ո՞ր մասը աշակերտներից մեկը լավ չի հասկանում։",
    answerEs: "No entiende bien la diferencia entre productores y consumidores.",
    answerAm: "Նա լավ չի հասկանում արտադրողների և սպառողների տարբերությունը։",
  },
  {
    id: 3,
    questionEs: "¿Qué propone su compañero?",
    questionAm: "Ի՞նչ է առաջարկում նրա դասընկերը։",
    answerEs: "Propone repasar juntos durante el recreo.",
    answerAm: "Նա առաջարկում է դասամիջոցի ժամանակ միասին կրկնել։",
  },
  {
    id: 4,
    questionEs: "¿Qué material ha preparado?",
    questionAm: "Ի՞նչ նյութ է նա պատրաստել։",
    answerEs: "Ha preparado un esquema.",
    answerAm: "Նա սխեմա է պատրաստել։",
  },
  {
    id: 5,
    questionEs: "¿Qué van a hacer después?",
    questionAm: "Ի՞նչ են նրանք անելու հետո։",
    answerEs: "Van a hacer algunas preguntas para practicar.",
    answerAm: "Նրանք մի քանի հարց են անելու՝ վարժվելու համար։",
  },
];

export const LISTENING_EXERCISES: ListeningExercise[] = [
  {
    id: 1,
    situationEs: "Oye, ¿sabes qué había que hacer para hoy? Se me ha olvidado apuntarlo.",
    situationAm: "Լսի՛ր, գիտե՞ս՝ ինչ պետք էր անել այսօրվա համար։ Մոռացել եմ գրի առնել։",
    promptQuestion: "¿Cómo responderías? / Ինչպե՞ս կպատասխանես:",
    options: [
      {
        key: "A",
        es: "Sí, había que terminar los ejercicios cuatro y cinco.",
        am: "Այո, պետք էր ավարտել 4-րդ և 5-րդ վարժությունները։",
      },
      { key: "B", es: "Estoy en el patio.", am: "Ես բակում եմ։" },
      { key: "C", es: "Son las diez.", am: "Ժամը տասն է։" },
      { key: "D", es: "No me gusta correr.", am: "Չեմ սիրում վազել։" },
    ],
    correctKey: "A",
  },
  {
    id: 2,
    situationEs: "¿Te has enterado de lo que ha dicho la profe? Yo estaba hablando y no he oído nada.",
    situationAm: "Հասկացա՞ր՝ ուսուցչուհին ինչ ասաց։ Ես խոսում էի և ոչինչ չլսեցի։",
    promptQuestion: "¿Qué ha dicho la profe? / Ի՞նչ պատասխան է համապատասխանում:",
    options: [
      {
        key: "A",
        es: "Ha dicho que mañana tenemos que traer el trabajo.",
        am: "Նա ասաց, որ վաղը պետք է աշխատանքը բերենք։",
      },
      { key: "B", es: "Mi mochila es nueva.", am: "Իմ պայուսակը նոր է։" },
      { key: "C", es: "Voy en autobús.", am: "Ավտոբուսով եմ գնում։" },
      { key: "D", es: "Tengo hambre.", am: "Քաղցած եմ։" },
    ],
    correctKey: "A",
  },
  {
    id: 3,
    situationEs: "Venga, date prisa, que como lleguemos tarde otra vez nos van a decir algo.",
    situationAm: "Դե՛, շտապի՛ր, որովհետև եթե նորից ուշանանք, մեզ նկատողություն կանեն։",
    promptQuestion: "¿Qué ocurre? / Ի՞նչ է կատարվում:",
    options: [
      { key: "A", es: "Они спешат на урок (Դասին են շտապում)", am: "Շտապում են դասին" },
      { key: "B", es: "Они идут домой (Տուն են գնում)", am: "Տուն են գնում" },
      { key: "C", es: "Они хотят поесть (Ուզում են ուտել)", am: "Ուզում են ուտել" },
      { key: "D", es: "Они ищут книгу (Գիրք են փնտրում)", am: "Գիրք են փնտրում" },
    ],
    correctKey: "A",
  },
  {
    id: 4,
    situationEs: "¿Qué toca ahora? ¿Mates o Lengua? Siempre me lío con el horario.",
    situationAm: "Հիմա ի՞նչ դաս ունենք՝ մաթեմատիկա՞, թե՞ իսպաներեն։ Ես միշտ շփոթում եմ դասացուցակը։",
    promptQuestion: "¿Qué asignatura toca? / Ի՞նչ պատասխան է համապատասխանում:",
    options: [
      { key: "A", es: "Ahora toca Matemáticas.", am: "Հիմա մաթեմատիկա է։" },
      { key: "B", es: "Tengo trece años.", am: "Ես 13 տարեկան եմ։" },
      { key: "C", es: "Es mi cuaderno.", am: "Սա իմ տետրն է։" },
      { key: "D", es: "Estoy cansado.", am: "Հոգնած եմ։" },
    ],
    correctKey: "A",
  },
  {
    id: 5,
    situationEs: "No entiendo nada de este ejercicio. ¿Me echas una mano?",
    situationAm: "Այս վարժությունից ոչինչ չեմ հասկանում։ Կօգնե՞ս ինձ։",
    promptQuestion: "¿Cómo le respondes? / Ինչպե՞ս կպատասխանես:",
    options: [
      {
        key: "A",
        es: "Claro, dime qué parte no entiendes.",
        am: "Իհարկե, ասա՝ որ մասը չես հասկանում։",
      },
      { key: "B", es: "Mañana es jueves.", am: "Վաղը հինգշաբթի է։" },
      { key: "C", es: "Me gusta el fútbol.", am: "Սիրում եմ ֆուտբոլը։" },
      { key: "D", es: "Tengo una hermana.", am: "Քույր ունեմ։" },
    ],
    correctKey: "A",
    tip: {
      es: "echar una mano = ayudar",
      ru: "помочь",
      am: "օգնել",
    },
  },
  {
    id: 6,
    situationEs: "Espera, no borres la pizarra todavía, que no me ha dado tiempo a copiarlo todo.",
    situationAm: "Սպասիր, դեռ մի՛ ջնջիր գրատախտակը, ես չեմ հասցրել ամեն ինչ արտագրել։",
    promptQuestion: "¿Qué hay que hacer? / Ի՞նչ պետք է անել:",
    options: [
      { key: "A", es: "Подождать и не стирать доску (Սպասել և չջնջել գրատախտակը)", am: "Սպասել և չջնջել գրատախտակը" },
      { key: "B", es: "Открыть окно (Բացել պատուհանը)", am: "Բացել պատուհանը" },
      { key: "C", es: "Выйти из класса (Դուրս գալ դասարանից)", am: "Դուրս գալ դասարանից" },
      { key: "D", es: "Закрыть книгу (Փակել գիրքը)", am: "Փակել գիրքը" },
    ],
    correctKey: "A",
  },
  {
    id: 7,
    situationEs: "¿Quieres venir con nosotros al recreo o te quedas aquí terminando el ejercicio?",
    situationAm: "Ուզո՞ւմ ես մեզ հետ գալ դասամիջոցի, թե՞ այստեղ կմնաս՝ վարժությունն ավարտելու։",
    promptQuestion: "¿Qué opción responde lógicamente? / Ո՞րն է տրամաբանական պատասխանը:",
    options: [
      {
        key: "A",
        es: "Voy con vosotros, ya lo termino después.",
        am: "Ձեզ հետ կգամ, հետո կավարտեմ։",
      },
      { key: "B", es: "Mi casa está lejos.", am: "Իմ տունը հեռու է։" },
      { key: "C", es: "Son veinte euros.", am: "Քսան եվրո է։" },
      { key: "D", es: "Tengo Ciencias.", am: "Բնագիտություն ունեմ։" },
    ],
    correctKey: "A",
  },
  {
    id: 8,
    situationEs: "Creo que la profe ha dicho que trabajemos por parejas, pero no estoy seguro.",
    situationAm: "Կարծում եմ՝ ուսուցչուհին ասաց, որ զույգերով աշխատենք, բայց վստահ չեմ։",
    promptQuestion: "¿Cómo confirmas? / Ինչպե՞ս ես հաստատում:",
    options: [
      { key: "A", es: "Sí, yo también he entendido eso.", am: "Այո, ես էլ այդպես հասկացա։" },
      { key: "B", es: "No tengo hermanos.", am: "Եղբայր կամ քույր չունեմ։" },
      { key: "C", es: "Hace frío.", am: "Ցուրտ է։" },
      { key: "D", es: "Vivo cerca.", am: "Մոտիկ եմ ապրում։" },
    ],
    correctKey: "A",
  },
  {
    id: 9,
    situationEs: "¿Me dejas tus apuntes un momento? Ayer falté y me falta una parte.",
    situationAm: "Կարո՞ղ ես մի պահ տալ քո գրառումները։ Երեկ բացակայում էի և մի մասը չունեմ։",
    promptQuestion: "¿Qué le respondes? / Ինչպե՞ս կպատասխանես:",
    options: [
      {
        key: "A",
        es: "Sí, claro, pero luego me los devuelves.",
        am: "Այո, իհարկե, բայց հետո կվերադարձնես։",
      },
      { key: "B", es: "No sé jugar al tenis.", am: "Չգիտեմ թենիս խաղալ։" },
      { key: "C", es: "Estoy en primero de ESO.", am: "Ես 1-ին դասարանում եմ (ESO):" },
      { key: "D", es: "Hoy es martes.", am: "Այսօր երեքշաբթի է։" },
    ],
    correctKey: "A",
  },
  {
    id: 10,
    situationEs: "A ver, chicos, dejad de hablar y prestad atención, que esto entra en el examen.",
    situationAm: "Լավ, երեխաներ, դադարեք խոսել և ուշադրություն դարձրեք, որովհետև սա քննության մեջ լինելու է։",
    promptQuestion: "¿Qué es lo importante? / Ի՞նչն է կարևոր հասկանալ:",
    options: [
      { key: "A", es: "Эта тема будет на экзамене (Այս թեման լինելու է քննության մեջ)", am: "Այս թեման քննությանը կլինի" },
      { key: "B", es: "Экзамена не будет (Քննություն չի լինի)", am: "Քննություն չի լինելու" },
      { key: "C", es: "Нужно выйти (Պետք է դուրս գալ)", am: "Պետք է դուրս գալ" },
      { key: "D", es: "Можно разговаривать (Կարելի է խոսել)", am: "Կարելի է խոսել" },
    ],
    correctKey: "A",
  },
  {
    id: 11,
    situationEs: "¿Tú has entendido cómo se hace? Porque yo me he perdido a mitad de la explicación.",
    situationAm: "Դու հասկացա՞ր՝ ինչպես է արվում։ Ես բացատրության կեսից այլևս չհասկացա։",
    promptQuestion: "¿Cómo respondes? / Ինչպե՞ս կպատասխանես:",
    options: [
      {
        key: "A",
        es: "Más o menos. Si quieres, lo miramos juntos.",
        am: "Քիչ թե շատ։ Եթե ուզում ես, միասին նայենք։",
      },
      { key: "B", es: "Tengo sueño.", am: "Քնկոտ եմ։" },
      { key: "C", es: "Vivo en Madrid.", am: "Մադրիդում եմ ապրում։" },
      { key: "D", es: "Es muy caro.", am: "Շատ թանկ է։" },
    ],
    correctKey: "A",
    tip: {
      es: "me he perdido = he dejado de entender",
      ru: "я перестал понимать",
      am: "ես կորցրի բացատրության ընթացքը",
    },
  },
  {
    id: 12,
    situationEs: "Al final, ¿el trabajo se entrega hoy o mañana? Cada uno me dice una cosa.",
    situationAm: "Վերջիվերջո աշխատանքը այսօ՞ր ենք հանձնում, թե՞ վաղը։ Ամեն մեկը տարբեր բան է ասում։",
    promptQuestion: "¿Cuándo se entrega? / Ե՞րբ է հանձնման օրը:",
    options: [
      {
        key: "A",
        es: "Mañana. La profesora lo ha cambiado.",
        am: "Վաղը։ Ուսուցչուհին փոխել է։",
      },
      { key: "B", es: "Está encima de la mesa.", am: "Սեղանի վրա է։" },
      { key: "C", es: "Tengo Educación Física.", am: "Ֆիզկուլտուրա ունեմ։" },
      { key: "D", es: "No quiero comer.", am: "Չեմ ուզում ուտել։" },
    ],
    correctKey: "A",
  },
  {
    id: 13,
    situationEs: "Me he dejado el estuche en casa. ¿Tienes un boli de sobra?",
    situationAm: "Գրչատուփս տանն եմ մոռացել։ Ավելորդ գրիչ ունե՞ս։",
    promptQuestion: "¿Tienes un boli? / Ի՞նչ պատասխան է համապատասխանում:",
    options: [
      { key: "A", es: "Sí, toma, tengo otro.", am: "Այո, վերցրու, ևս մեկը ունեմ։" },
      { key: "B", es: "Mi estuche es rojo.", am: "Իմ գրչատուփը կարմիր է։" },
      { key: "C", es: "Voy al comedor.", am: "Ճաշարան եմ գնում։" },
      { key: "D", es: "No hay clase.", am: "Դաս չկա։" },
    ],
    correctKey: "A",
    tip: {
      es: "de sobra = extra / suplementario",
      ru: "лишний, запасной",
      am: "ավելորդ, պահեստային",
    },
  },
  {
    id: 14,
    situationEs: "¿Te importa cambiarte de sitio? Es que desde aquí no veo bien la pizarra.",
    situationAm: "Դեմ չե՞ս, եթե տեղերով փոխվենք։ Այստեղից գրատախտակը լավ չեմ տեսնում։",
    promptQuestion: "¿Qué le respondes con amabilidad? / Ինչպե՞ս կպատասխանես:",
    options: [
      { key: "A", es: "No, claro. Cámbiate.", am: "Ոչ, իհարկե։ Փոխիր տեղդ։" },
      { key: "B", es: "Tengo un examen.", am: "Քննություն ունեմ։" },
      { key: "C", es: "Son las doce.", am: "Ժամը տասներկուսն է։" },
      { key: "D", es: "Está cerrado.", am: "Փակ է։" },
    ],
    correctKey: "A",
  },
  {
    id: 15,
    situationEs: "No hace falta que copies todo. Solo apunta las ideas principales.",
    situationAm: "Պետք չէ ամեն ինչ արտագրել։ Միայն գրի առ հիմնական մտքերը։",
    promptQuestion: "¿Qué se debe hacer? / Ի՞նչ պետք է անել:",
    options: [
      { key: "A", es: "Записать только главное (Գրել միայն կարևորը)", am: "Գրել միայն հիմնական մտքերը" },
      { key: "B", es: "Переписать всё (Արտագրել ամեն ինչ)", am: "Արտագրել ամեն ինչ" },
      { key: "C", es: "Ничего не писать (Ոչինչ չգրել)", am: "Ոչինչ չգրել" },
      { key: "D", es: "Читать вслух (Բարձրաձայն կարդալ)", am: "Բարձրաձայն կարդալ" },
    ],
    correctKey: "A",
  },
  {
    id: 16,
    situationEs: "¿Nos juntamos después de clase para terminar la presentación? Nos queda bastante.",
    situationAm: "Դասից հետո հավաքվե՞նք՝ շնորհանդեսը ավարտելու համար։ Դեռ բավական շատ բան է մնացել։",
    promptQuestion: "¿Qué responde? / Ի՞նչ է պատասխանում ընկերը:",
    options: [
      { key: "A", es: "Vale, puedo quedarme media hora.", am: "Լավ, կարող եմ կես ժամ մնալ։" },
      { key: "B", es: "No tengo mochila.", am: "Պայուսակ չունեմ։" },
      { key: "C", es: "Hoy llueve.", am: "Այսօր անձրև է գալիս։" },
      { key: "D", es: "Me gusta Historia.", am: "Պատմություն եմ սիրում։" },
    ],
    correctKey: "A",
  },
  {
    id: 17,
    situationEs: "No te preocupes si no te sale a la primera. Inténtalo otra vez.",
    situationAm: "Մի անհանգստացիր, եթե առաջին անգամ չստացվի։ Նորից փորձիր։",
    promptQuestion: "¿Qué te dicen? / Ի՞նչ են ասում քեզ:",
    options: [
      { key: "A", es: "Подбадривают попробовать ещё раз (Քաջալերում են նորից փորձել)", am: "Քաջալերում են նորից փորձել" },
      { key: "B", es: "Ругают за опоздание (Նախատում են ուշանալու համար)", am: "Նախատում են ուշացման համար" },
      { key: "C", es: "Просят выйти (Խնդրում են դուրս գալ)", am: "Խնդրում են դուրս գալ" },
      { key: "D", es: "Отменяют задание (Չեղարկում են առաջադրանքը)", am: "Չեղարկում են առաջադրանքը" },
    ],
    correctKey: "A",
  },
  {
    id: 18,
    situationEs: "¿Qué ha mandado de deberes? Estaba recogiendo y no me he enterado.",
    situationAm: "Ի՞նչ տնային աշխատանք տվեց։ Ես հավաքում էի իրերս և չլսեցի։",
    promptQuestion: "¿Cuáles son los deberes? / Ո՞րն է տնային առաջադրանքը:",
    options: [
      {
        key: "A",
        es: "Hay que leer dos páginas y hacer tres preguntas.",
        am: "Պետք է կարդալ երկու էջ և պատասխանել երեք հարցի։",
      },
      { key: "B", es: "La biblioteca está cerrada.", am: "Գրադարանը փակ է։" },
      { key: "C", es: "Tengo trece años.", am: "Ես 13 տարեկան եմ։" },
      { key: "D", es: "Mi amigo se llama Pablo.", am: "Իմ ընկերոջ անունը Պաբլո է։" },
    ],
    correctKey: "A",
  },
  {
    id: 19,
    situationEs: "¿Me esperas a la salida? Tengo que hablar un momento con el profesor.",
    situationAm: "Դուրս գալուց հետո ինձ կսպասե՞ս։ Պետք է մի պահ խոսեմ ուսուցչի հետ։",
    promptQuestion: "¿Qué le respondes? / Ինչպե՞ս կպատասխանես:",
    options: [
      { key: "A", es: "Sí, te espero en la puerta.", am: "Այո, քեզ մուտքի մոտ կսպասեմ։" },
      { key: "B", es: "Estoy en clase.", am: "Դասարանում եմ։" },
      { key: "C", es: "No tengo libro.", am: "Գիրք չունեմ։" },
      { key: "D", es: "Es muy difícil.", am: "Շատ դժվար է։" },
    ],
    correctKey: "A",
  },
  {
    id: 20,
    situationEs: "Como no acabemos ahora, tendremos que terminarlo en casa.",
    situationAm: "Եթե հիմա չավարտենք, ստիպված կլինենք տանը ավարտել։",
    promptQuestion: "¿Qué se deduce? / Ի՞նչ է սրանից բխում:",
    options: [
      { key: "A", es: "Нужно постараться закончить сейчас (Պետք է աշխատել հիմա ավարտել)", am: "Պետք է փորձել հենց հիմա ավարտել" },
      { key: "B", es: "Задание отменили (Առաջադրանքը չեղարկվել է)", am: "Առաջադրանքը չեղարկվել է" },
      { key: "C", es: "Можно идти домой (Կարելի է տուն գնալ)", am: "Կարելի է տուն գնալ" },
      { key: "D", es: "Нужно начать заново (Պետք է նորից սկսել)", am: "Պետք է նորից սկսել" },
    ],
    correctKey: "A",
  },
];

export const KEY_PHRASES: KeyPhrase[] = [
  { id: 1, es: "No me entero.", am: "Չեմ հասկանում՝ ինչ է կատարվում։", context: "Երբ չես կողմնորոշվում կամ չես հասկանում ասվածը" },
  { id: 2, es: "Me he perdido.", am: "Այլևս չեմ հետևում / չեմ հասկանում։", context: "Բացատրության ընթացքում թելը կորցնելիս" },
  { id: 3, es: "¿Qué toca ahora?", am: "Հիմա ի՞նչ դաս ունենք։", context: "Դասացուցակի մասին հարցնելիս" },
  { id: 4, es: "¿Qué había que hacer?", am: "Ի՞նչ պետք էր անել։", context: "Առաջադրանքը ճշտելիս" },
  { id: 5, es: "¿Me echas una mano?", am: "Կօգնե՞ս ինձ։", context: "Ընկերոջից օգնություն խնդրելիս" },
  { id: 6, es: "No me ha dado tiempo.", am: "Չեմ հասցրել։", context: "Երբ ժամանակը չի բավականացրել" },
  { id: 7, es: "Me lo he dejado en casa.", am: "Տանն եմ մոռացել։", context: "Իրերը տանը մոռանալու դեպքում" },
  { id: 8, es: "Nos queda bastante.", am: "Դեռ բավական շատ բան է մնացել։", context: "Աշխատանքի ծավալի մասին խոսելիս" },
  { id: 9, es: "Da igual.", am: "Կարևոր չէ / միևնույն է։", context: "Երբ էական տարբերություն չկա" },
  { id: 10, es: "Ya voy.", am: "Արդեն գալիս եմ։", context: "Երբ կանչում են ու պատասխանում ես, որ գալիս ես" },
  { id: 11, es: "Ahora mismo.", am: "Հենց հիմա։", context: "Անմիջապես կատարելու մասին" },
  { id: 12, es: "A ver…", am: "Դե տեսնենք / լավ…", context: "Ուշադրություն հրավիրելիս կամ մտածելիս" },
  { id: 13, es: "Venga.", am: "Դե՛ / արի՛ / եկե՛ք։", context: "Շտապեցնելու կամ քաջալերելու խոսք" },
];

export const PROGRESSIVE_LEVELS: LevelItem[] = [
  // Уровень 1
  {
    id: 1,
    level: 1,
    levelTitle: "Уровень 1 — Короткие разговоры / Կարճ խոսակցություններ",
    levelBadge: "🟢 Уровень 1",
    dialogueEs: ["—¿Vienes?", "—Sí, ya voy."],
    dialogueAm: ["— Գալի՞ս ես։", "— Այո, արդեն գալիս եմ։"],
    questions: [
      {
        questionEs: "¿Qué ocurre?",
        questionAm: "Ի՞նչ է տեղի ունենում:",
        options: [
          { key: "A", text: "Его зовут пойти вместе (Նրան կանչում են միասին գնալու)", correct: true },
          { key: "B", text: "Он делает уроки (Նա դասերն է անում)", correct: false },
          { key: "C", text: "Он идёт домой (Նա տուն է գնում)", correct: false },
        ],
        answerEs: "A) Его зовут пойти вместе.",
        answerAm: "Նրան կանչում են միասին գնալու։",
      },
    ],
  },
  {
    id: 2,
    level: 1,
    levelTitle: "Уровень 1 — Короткие разговоры / Կարճ խոսակցություններ",
    levelBadge: "🟢 Уровень 1",
    dialogueEs: ["—¿Me esperas?", "—Claro."],
    dialogueAm: ["— Կսպասե՞ս ինձ։", "— Իհարկե։"],
    questions: [
      {
        questionEs: "¿Cómo se puede responder?",
        questionAm: "Ինչպե՞ս կարելի է պատասխանել:",
        answerEs: "Sí, te espero.",
        answerAm: "Այո, քեզ կսպասեմ։",
      },
    ],
  },
  {
    id: 3,
    level: 1,
    levelTitle: "Уровень 1 — Короткие разговоры / Կարճ խոսակցություններ",
    levelBadge: "🟢 Уровень 1",
    dialogueEs: ["—¿Qué toca ahora?", "—Matemáticas."],
    dialogueAm: ["— Հիմա ի՞նչ դաս է։", "— Մաթեմատիկա։"],
    questions: [
      {
        questionEs: "¿Qué clase tienen?",
        questionAm: "Ի՞նչ դաս ունեն:",
        answerEs: "Matemáticas.",
        answerAm: "Մաթեմատիկա։",
      },
    ],
  },
  {
    id: 4,
    level: 1,
    levelTitle: "Уровень 1 — Короткие разговоры / Կարճ խոսակցություններ",
    levelBadge: "🟢 Уровень 1",
    dialogueEs: ["—¿Tienes un boli?", "—Sí, toma."],
    dialogueAm: ["— Գրիչ ունե՞ս։", "— Այո, վերցրու։"],
    questions: [
      {
        questionEs: "¿Qué pide el compañero?",
        questionAm: "Ի՞նչ է խնդրում դասընկերը:",
        answerEs: "Un bolígrafo (un boli).",
        answerAm: "Գրիչ (bolígrafo)։",
      },
    ],
  },
  {
    id: 5,
    level: 1,
    levelTitle: "Уровень 1 — Короткие разговоры / Կարճ խոսակցություններ",
    levelBadge: "🟢 Уровень 1",
    dialogueEs: ["—¿Has terminado?", "—Todavía no."],
    dialogueAm: ["— Ավարտե՞լ ես։", "— Դեռ ոչ։"],
    questions: [
      {
        questionEs: "¿Ha terminado?",
        questionAm: "Ավարտե՞լ է նա:",
        answerEs: "No, todavía no.",
        answerAm: "Ոչ, դեռ ոչ։",
      },
    ],
  },

  // Уровень 2
  {
    id: 6,
    level: 2,
    levelTitle: "Уровень 2 — Чуть длиннее / Մի փոքր ավելի երկար",
    levelBadge: "🟡 Уровень 2",
    dialogueEs: ["—Oye, ¿qué página ha dicho la profesora?", "—Creo que la treinta y cinco."],
    dialogueAm: ["— Լսի՛ր, ուսուցչուհին ո՞ր էջն ասաց։", "— Կարծում եմ՝ 35-րդը։"],
    questions: [
      {
        questionEs: "¿Qué quiere saber el alumno?",
        questionAm: "Ի՞նչ է ուզում իմանալ աշակերտը:",
        options: [
          { key: "A", text: "La hora (Ժամը)", correct: false },
          { key: "B", text: "La página (Էջի համարը)", correct: true },
          { key: "C", text: "El nombre del profesor (Ուսուցչի անունը)", correct: false },
        ],
        answerEs: "B) La página (página 35).",
        answerAm: "Էջի համարը (35-րդ էջը)։",
      },
    ],
  },
  {
    id: 7,
    level: 2,
    levelTitle: "Уровень 2 — Чуть длиннее / Մի փոքր ավելի երկար",
    levelBadge: "🟡 Уровень 2",
    dialogueEs: ["—¿Quieres sentarte aquí? Hay sitio.", "—Vale, gracias."],
    dialogueAm: ["— Ուզո՞ւմ ես այստեղ նստել։ Տեղ կա։", "— Լավ, շնորհակալություն։"],
    questions: [
      {
        questionEs: "¿Qué le ofrecen?",
        questionAm: "Ի՞նչ են առաջարկում նրան:",
        answerEs: "Un sitio para sentarse.",
        answerAm: "Նստելու տեղ։",
      },
    ],
  },
  {
    id: 8,
    level: 2,
    levelTitle: "Уровень 2 — Чуть длиннее / Մի փոքր ավելի երկար",
    levelBadge: "🟡 Уровень 2",
    dialogueEs: ["—No entiendo este ejercicio.", "—Espera, te ayudo."],
    dialogueAm: ["— Այս վարժությունը չեմ հասկանում։", "— Սպասիր, կօգնեմ։"],
    questions: [
      {
        questionEs: "¿Qué va a hacer el compañero?",
        questionAm: "Ի՞նչ է պատրաստվում անել դասընկերը:",
        answerEs: "Ayudarle a entender el ejercicio.",
        answerAm: "Օգնել նրան հասկանալ վարժությունը։",
      },
    ],
  },
  {
    id: 9,
    level: 2,
    levelTitle: "Уровень 2 — Чуть длиннее / Մի փոքր ավելի երկար",
    levelBadge: "🟡 Уровень 2",
    dialogueEs: ["—¿Vienes al recreo?", "—Sí, pero primero termino esto."],
    dialogueAm: ["— Դասամիջոցի գալի՞ս ես։", "— Այո, բայց սկզբում սա կավարտեմ։"],
    questions: [
      {
        questionEs: "¿Va al recreo inmediatamente?",
        questionAm: "Արդյո՞ք նա անմիջապես գնում է դասամիջոցի:",
        answerEs: "No. Primero termina el ejercicio.",
        answerAm: "Ոչ։ Սկզբում կավարտի առաջադրանքը։",
      },
    ],
  },
  {
    id: 10,
    level: 2,
    levelTitle: "Уровень 2 — Чуть длиннее / Մի փոքր ավելի երկար",
    levelBadge: "🟡 Уровень 2",
    dialogueEs: ["—¿Qué tenemos que hacer para mañana?", "—Leer el texto y responder las preguntas."],
    dialogueAm: ["— Ի՞նչ պետք է անենք վաղվա համար։", "— Կարդալ տեքստը և պատասխանել հարցերին։"],
    questions: [
      {
        questionEs: "¿Cuáles son los deberes?",
        questionAm: "Որո՞նք են տնային հանձնարարությունները:",
        answerEs: "Leer el texto y responder las preguntas.",
        answerAm: "Կարդալ տեքստը և պատասխանել հարցերին։",
      },
    ],
  },

  // Уровень 3
  {
    id: 11,
    level: 3,
    levelTitle: "Уровень 3 — Реальная речь / Իրական խոսակցական լեզու",
    levelBadge: "🟠 Уровень 3",
    dialogueEs: ["—Oye, ¿te has enterado de lo que ha dicho la profe?", "—No, estaba guardando mis cosas."],
    dialogueAm: ["— Լսի՛ր, հասկացա՞ր՝ ուսուցչուհին ինչ ասաց։", "— Ոչ, իրերս էի հավաքում։"],
    questions: [
      {
        questionEs: "¿Por qué no lo ha oído?",
        questionAm: "Ինչո՞ւ նա չլսեց:",
        answerEs: "Porque estaba guardando sus cosas.",
        answerAm: "Որովհետև նա իրերն էր հավաքում։",
      },
    ],
  },
  {
    id: 12,
    level: 3,
    levelTitle: "Уровень 3 — Реальная речь / Իրական խոսակցական լեզու",
    levelBadge: "🟠 Уровень 3",
    dialogueEs: ["—¿Me dejas los apuntes? Ayer no vine a clase.", "—Sí, pero devuélvemelos mañana."],
    dialogueAm: ["— Կարո՞ղ ես գրառումներդ տալ։ Երեկ դասի չէի եկել։", "— Այո, բայց վաղը վերադարձրու։"],
    questions: [
      {
        questionEs: "¿Por qué necesita los apuntes?",
        questionAm: "Ինչո՞ւ են նրան պետք գրառումները:",
        answerEs: "Porque ayer faltó a clase.",
        answerAm: "Որովհետև երեկ դասից բացակայում էր։",
      },
    ],
  },
  {
    id: 13,
    level: 3,
    levelTitle: "Уровень 3 — Реальная речь / Իրական խոսակցական լեզու",
    levelBadge: "🟠 Уровень 3",
    dialogueEs: ["—Date prisa, que la clase ya ha empezado.", "—Ya voy, espera."],
    dialogueAm: ["— Շտապի՛ր, դասը արդեն սկսվել է։", "— Գալիս եմ, սպասիր։"],
    questions: [
      {
        questionEs: "¿Qué problema tienen?",
        questionAm: "Ի՞նչ խնդիր ունեն:",
        answerEs: "Van tarde / están llegando tarde a clase.",
        answerAm: "Ուշանում են դասից։",
      },
    ],
  },
  {
    id: 14,
    level: 3,
    levelTitle: "Уровень 3 — Реальная речь / Իրական խոսակցական լեզու",
    levelBadge: "🟠 Уровень 3",
    dialogueEs: ["—¿Tú sabes si el examen es hoy o mañana?", "—Mañana. Hoy solo vamos a repasar."],
    dialogueAm: ["— Գիտե՞ս՝ քննությունն այսօր է, թե վաղը։", "— Վաղը։ Այսօր միայն կրկնելու ենք։"],
    questions: [
      {
        questionEs: "¿Cuándo es el examen?",
        questionAm: "Ե՞րբ է քննությունը:",
        answerEs: "Mañana.",
        answerAm: "Վաղը։",
      },
    ],
  },
  {
    id: 15,
    level: 3,
    levelTitle: "Уровень 3 — Реальная речь / Իրական խոսակցական լեզու",
    levelBadge: "🟠 Уровень 3",
    dialogueEs: ["—No me da tiempo a terminarlo.", "—No pasa nada, creo que podemos entregarlo mañana."],
    dialogueAm: ["— Չեմ հասցնում ավարտել։", "— Ոչինչ, կարծում եմ՝ կարող ենք վաղը հանձնել։"],
    questions: [
      {
        questionEs: "¿Qué significa «no me da tiempo»?",
        questionAm: "Ի՞նչ է նշանակում «no me da tiempo»:",
        answerEs: "No tengo suficiente tiempo / no llego a tiempo.",
        answerAm: "Չեմ հասցնում, ժամանակը չի հերիքում։",
      },
    ],
  },

  // Уровень 4
  {
    id: 16,
    level: 4,
    levelTitle: "Уровень 4 — Уже сложнее / Ավելի բարդ մակարդակ",
    levelBadge: "🔴 Уровень 4",
    dialogueEs: [
      "—A ver, ¿tú has entendido qué hay que hacer? Porque yo me he perdido cuando ha empezado a explicar la segunda parte.",
      "—Más o menos. Primero tenemos que leer el texto y luego hacer un resumen.",
    ],
    dialogueAm: [
      "— Լսի՛ր, դու հասկացա՞ր՝ ինչ պետք է անել։ Ես այլևս չհասկացա, երբ նա սկսեց երկրորդ մասը բացատրել։",
      "— Քիչ թե շատ։ Սկզբում պետք է կարդանք տեքստը, հետո ամփոփում գրենք։",
    ],
    questions: [
      {
        questionEs: "1. ¿Qué tienen que hacer primero?",
        questionAm: "1. Ի՞նչ պետք է անեն նրանք սկզբում:",
        options: [
          { key: "A", text: "Escribir (Գրել)", correct: false },
          { key: "B", text: "Leer el texto (Կարդալ տեքստը)", correct: true },
          { key: "C", text: "Hablar con el profesor (Խոսել ուսուցչի հետ)", correct: false },
        ],
        answerEs: "B) Leer el texto.",
        answerAm: "Կարդալ տեքստը։",
      },
      {
        questionEs: "2. ¿Y después?",
        questionAm: "2. Իսկ հետո՞:",
        answerEs: "Hacer un resumen.",
        answerAm: "Ամփոփում (կոնսպեկտ) գրել։",
      },
    ],
  },
  {
    id: 17,
    level: 4,
    levelTitle: "Уровень 4 — Уже сложнее / Ավելի բարդ մակարդակ",
    levelBadge: "🔴 Уровень 4",
    dialogueEs: [
      "—Pensaba que hoy teníamos Educación Física, pero resulta que han cambiado el horario.",
      "—Sí, ahora tenemos Ciencias y Educación Física después del recreo.",
    ],
    dialogueAm: [
      "— Կարծում էի՝ այսօր ֆիզկուլտուրա ունենք, բայց պարզվում է՝ դասացուցակը փոխել են։",
      "— Այո, հիմա բնագիտություն ունենք, իսկ ֆիզկուլտուրան՝ դասամիջոցից հետո։",
    ],
    questions: [
      {
        questionEs: "1. ¿Qué tienen ahora?",
        questionAm: "1. Հիմա ի՞նչ դաս ունեն:",
        answerEs: "Ciencias.",
        answerAm: "Բնագիտություն (Ciencias)։",
      },
      {
        questionEs: "2. ¿Cuándo tienen Educación Física?",
        questionAm: "2. Ե՞րբ ունեն ֆիզկուլտուրա:",
        answerEs: "Después del recreo.",
        answerAm: "Դասամիջոցից հետո։",
      },
    ],
  },
  {
    id: 18,
    level: 4,
    levelTitle: "Уровень 4 — Уже сложнее / Ավելի բարդ մակարդակ",
    levelBadge: "🔴 Уровень 4",
    dialogueEs: [
      "—¿Por qué no has entregado el trabajo?",
      "—Porque pensaba que era para mañana.",
      "—No, os dije que era para hoy.",
      "—Perdón, lo he entendido mal.",
    ],
    dialogueAm: [
      "— Ինչո՞ւ աշխատանքը չես հանձնել։",
      "— Որովհետև կարծում էի՝ վաղվա համար է։",
      "— Ոչ, ես ասել էի՝ այսօրվա համար է։",
      "— Ներողություն, սխալ եմ հասկացել։",
    ],
    questions: [
      {
        questionEs: "¿Cuál ha sido el problema?",
        questionAm: "Ո՞րն էր խնդիրը:",
        answerEs: "Ha entendido mal la fecha de entrega.",
        answerAm: "Սխալ էր հասկացել հանձնման օրը։",
      },
    ],
  },

  // Уровень 5
  {
    id: 19,
    level: 5,
    levelTitle: "Уровень 5 — Ловим общий смысл / Ընդհանուր իմաստը ըմբռնել",
    levelBadge: "🔴 Уровень 5",
    dialogueEs: [
      "—Oye, ¿vas a bajar al patio?",
      "—Ahora no. Tengo que acabar esto porque, si no, la profesora me va a pedir que me quede después de clase.",
      "—Vale. Si termino antes, vuelvo y te espero.",
    ],
    dialogueAm: [
      "— Լսի՛ր, իջնելո՞ւ ես բակ։",
      "— Հիմա ոչ։ Պետք է սա ավարտեմ, որովհետև հակառակ դեպքում ուսուցչուհին կասի, որ դասից հետո մնամ։",
      "— Լավ։ Եթե շուտ ավարտեմ, կգամ և քեզ կսպասեմ։",
    ],
    questions: [
      {
        questionEs: "1. ¿Va al patio ahora?",
        questionAm: "1. Գնո՞ւմ է նա հիմա բակ:",
        answerEs: "No.",
        answerAm: "Ոչ։",
      },
      {
        questionEs: "2. ¿Por qué?",
        questionAm: "2. Ինչո՞ւ:",
        answerEs: "Porque tiene que terminar el trabajo.",
        answerAm: "Որովհետև պետք է ավարտի առաջադրանքը։",
      },
      {
        questionEs: "3. ¿Qué puede pasar si no termina?",
        questionAm: "3. Ի՞նչ կարող է պատահել, եթե չավարտի:",
        answerEs: "Puede tener que quedarse después de clase.",
        answerAm: "Կարող է ստիպված լինել մնալ դասերից հետո։",
      },
    ],
    summaryAm: "Իմաստը՝ աշակերտը հիմա դասամիջոցին բակ չի իջնում, քանի որ պետք է ավարտի իր աշխատանքը։",
  },
  {
    id: 20,
    level: 5,
    levelTitle: "Уровень 5 — Ловим общий смысл / Ընդհանուր իմաստը ըմբռնել",
    levelBadge: "🔴 Уровень 5",
    dialogueEs: [
      "—No sé qué hacer con esta parte del proyecto. He buscado información, pero hay demasiadas cosas.",
      "—Yo elegiría solo las ideas más importantes. Si ponemos todo, la presentación va a ser larguísima.",
      "—Tienes razón. Voy a quitar algunas cosas.",
    ],
    dialogueAm: [
      "— Չգիտեմ՝ ինչ անել նախագծի այս մասի հետ։ Տեղեկություն եմ փնտրել, բայց չափազանց շատ նյութ կա։",
      "— Ես կընտրեի միայն ամենակարևոր մտքերը։ Եթե ամեն ինչ դնենք, շնորհանդեսը չափազանց երկար կլինի։",
      "— Ճիշտ ես։ Մի քանի բան կհանեմ։",
    ],
    questions: [
      {
        questionEs: "1. ¿Cuál es el problema?",
        questionAm: "1. Ո՞րն է խնդիրը:",
        answerEs: "Tiene demasiada información.",
        answerAm: "Չափազանց շատ տեղեկություն կա։",
      },
      {
        questionEs: "2. ¿Qué le aconseja su compañero?",
        questionAm: "2. Ի՞նչ է խորհուրդ տալիս դասընկերը:",
        answerEs: "Elegir solo las ideas principales.",
        answerAm: "Ընտրել միայն կարևոր գաղափարները։",
      },
      {
        questionEs: "3. ¿Qué decide hacer?",
        questionAm: "3. Ի՞նչ է որոշում անել:",
        answerEs: "Quitar información innecesaria.",
        answerAm: "Հեռացնել ավելորդ տեղեկությունը։",
      },
    ],
    summaryAm: "Այստեղ պետք է հասկանալ ոչ թե ամեն բառը, այլ գլխավոր միտքը՝ տեղեկությունը չափազանց շատ է, պետք է ընտրել միայն կարևոր մասը։",
  },
];

export const BLITZ_ITEMS: BlitzItem[] = [
  {
    id: 1,
    promptEs: "¿Qué toca ahora?",
    promptAm: "Հիմա ի՞նչ դաս ունենք։",
    correctAnswerEs: "Matemáticas.",
    correctAnswerAm: "Մաթեմատիկա։",
    wrongAnswers: [
      { es: "Estoy en el patio.", am: "Ես բակում եմ։" },
      { es: "Tengo trece años.", am: "Ես 13 տարեկան եմ։" },
    ],
  },
  {
    id: 2,
    promptEs: "¿Te has enterado?",
    promptAm: "Հասկացա՞ր / Լսեցի՞ր։",
    correctAnswerEs: "Sí, claro. / No, ¿qué ha dicho?",
    correctAnswerAm: "Այո, իհարկե / Ոչ, ի՞նչ ասաց։",
    wrongAnswers: [
      { es: "Es mi cuaderno.", am: "Սա իմ տետրն է։" },
      { es: "Hoy hace calor.", am: "Այսօր տաք է։" },
    ],
  },
  {
    id: 3,
    promptEs: "¿Me esperas?",
    promptAm: "Կսպասե՞ս ինձ։",
    correctAnswerEs: "Sí, claro, te espero en la puerta.",
    correctAnswerAm: "Այո, իհարկե, դռան մոտ կսպասեմ։",
    wrongAnswers: [
      { es: "No tengo hambre.", am: "Քաղցած չեմ։" },
      { es: "Son las dos.", am: "Ժամը երկուսն է։" },
    ],
  },
  {
    id: 4,
    promptEs: "¿Has terminado?",
    promptAm: "Ավարտե՞լ ես։",
    correctAnswerEs: "Todavía no, me falta un poco.",
    correctAnswerAm: "Դեռ ոչ, մի քիչ մնացել է։",
    wrongAnswers: [
      { es: "Voy a Madrid.", am: "Մադրիդ եմ գնում։" },
      { es: "El libro es azul.", am: "Գիրքը կապույտ է։" },
    ],
  },
  {
    id: 5,
    promptEs: "¿Te queda mucho?",
    promptAm: "Դեռ շա՞տ բան ունես անելու։",
    correctAnswerEs: "No, casi he terminado.",
    correctAnswerAm: "Ոչ, գրեթե ավարտել եմ։",
    wrongAnswers: [
      { es: "Tengo un perro.", am: "Շուն ունեմ։" },
      { es: "Es jueves.", am: "Հինգշաբթի է։" },
    ],
  },
  {
    id: 6,
    promptEs: "¿Vienes con nosotros?",
    promptAm: "Մեզ հետ գալի՞ս ես։",
    correctAnswerEs: "Sí, voy con vosotros.",
    correctAnswerAm: "Այո, ձեզ հետ եմ գալիս։",
    wrongAnswers: [
      { es: "No sé nadar.", am: "Լողալ չգիտեմ։" },
      { es: "Tengo dos lápices.", am: "Երկու մատիտ ունեմ։" },
    ],
  },
  {
    id: 7,
    promptEs: "¿Qué había que hacer?",
    promptAm: "Ի՞նչ պետք էր անել։",
    correctAnswerEs: "Había que terminar el ejercicio.",
    correctAnswerAm: "Պետք էր վարժությունը ավարտել։",
    wrongAnswers: [
      { es: "Mi casa es grande.", am: "Իմ տունը մեծ է։" },
      { es: "El tren llega tarde.", am: "Գնացքը ուշանում է։" },
    ],
  },
  {
    id: 8,
    promptEs: "¿Me echas una mano?",
    promptAm: "Կօգնե՞ս ինձ։",
    correctAnswerEs: "Sí, claro, dime qué necesitas.",
    correctAnswerAm: "Այո, իհարկե, ասա՝ ինչ է պետք։",
    wrongAnswers: [
      { es: "No quiero manzanas.", am: "Խնձոր չեմ ուզում։" },
      { es: "Es muy caro.", am: "Շատ թանկ է։" },
    ],
  },
  {
    id: 9,
    promptEs: "¿Te importa si me siento aquí?",
    promptAm: "Դեմ չե՞ս, եթե այստեղ նստեմ։",
    correctAnswerEs: "No, claro que no, siéntate.",
    correctAnswerAm: "Ոչ, իհարկե դեմ չեմ, նստի՛ր։",
    wrongAnswers: [
      { es: "Ayer llovió.", am: "Երեկ անձրև էր։" },
      { es: "No tengo hermanos.", am: "Եղբայր կամ քույր չունեմ։" },
    ],
  },
  {
    id: 10,
    promptEs: "¿Por qué llegas tarde?",
    promptAm: "Ինչո՞ւ ես ուշացել։",
    correctAnswerEs: "Porque he perdido el autobús.",
    correctAnswerAm: "Որովհետև ավտոբուսից ուշացել էի։",
    wrongAnswers: [
      { es: "Me gustan las mates.", am: "Մաթեմատիկա եմ սիրում։" },
      { es: "Son las ocho.", am: "Ժամը ութն է։" },
    ],
  },
];
