export const DEFAULT = 'DEFAULT';
const CURRENT_YEAR = new Date().getFullYear();
const START_YEAR = 2021;

export const DAYS = Array.from(Array(31).keys()).map(i =>
    i < 9 ? `0${i + 1}` : (i + 1).toString()
);
export const MONTHS = Array.from(Array(12).keys()).map(i =>
    i < 9 ? `0${i + 1}` : (i + 1).toString()
);
export const YEARS = Array.from(
    { length: CURRENT_YEAR - START_YEAR },
    (v, k) => k + START_YEAR + 1
).reverse();

export const COUNTRIES = [
    {
        namePtBr: 'Afeganistão',
        nameInt: 'Afghanistan',
        code: 'AF',
    },
    {
        namePtBr: 'África do Sul',
        nameInt: 'South Africa',
        code: 'ZA',
    },
    {
        namePtBr: 'Albânia',
        nameInt: 'Albania',
        code: 'AL',
    },
    {
        namePtBr: 'Alemanha',
        nameInt: 'Germany',
        code: 'DE',
    },
    {
        namePtBr: 'Andorra',
        nameInt: 'Andorra',
        code: 'AD',
    },
    {
        namePtBr: 'Angola',
        nameInt: 'Angola',
        code: 'AO',
    },
    {
        namePtBr: 'Anguilla',
        nameInt: 'Anguilla',
        code: 'AI',
    },
    {
        namePtBr: 'Antártida',
        nameInt: 'Antarctica',
        code: 'AQ',
    },
    {
        namePtBr: 'Antígua e Barbuda',
        nameInt: 'Antigua & Barbuda',
        code: 'AG',
    },
    {
        namePtBr: 'Arábia Saudita',
        nameInt: 'Saudi Arabia',
        code: 'SA',
    },
    {
        namePtBr: 'Argélia',
        nameInt: 'Algeria',
        code: 'DZ',
    },
    {
        namePtBr: 'Argentina',
        nameInt: 'Argentina',
        code: 'AR',
    },
    {
        namePtBr: 'Armênia',
        nameInt: 'Armenia',
        code: 'AM',
    },
    {
        namePtBr: 'Aruba',
        nameInt: 'Aruba',
        code: 'AW',
    },
    {
        namePtBr: 'Austrália',
        nameInt: 'Australia',
        code: 'AU',
    },
    {
        namePtBr: 'Áustria',
        nameInt: 'Austria',
        code: 'AT',
    },
    {
        namePtBr: 'Azerbaijão',
        nameInt: 'Azerbaijan',
        code: 'AZ',
    },
    {
        namePtBr: 'Bahamas',
        nameInt: 'Bahamas',
        code: 'BS',
    },
    {
        namePtBr: 'Bahrein',
        nameInt: 'Bahrain',
        code: 'BH',
    },
    {
        namePtBr: 'Bangladesh',
        nameInt: 'Bangladesh',
        code: 'BD',
    },
    {
        namePtBr: 'Barbados',
        nameInt: 'Barbados',
        code: 'BB',
    },
    {
        namePtBr: 'Belarus',
        nameInt: 'Belarus',
        code: 'BY',
    },
    {
        namePtBr: 'Bélgica',
        nameInt: 'Belgium',
        code: 'BE',
    },
    {
        namePtBr: 'Belize',
        nameInt: 'Belize',
        code: 'BZ',
    },
    {
        namePtBr: 'Benin',
        nameInt: 'Benin',
        code: 'BJ',
    },
    {
        namePtBr: 'Bermudas',
        nameInt: 'Bermuda',
        code: 'BM',
    },
    {
        namePtBr: 'Bolívia',
        nameInt: 'Bolivia',
        code: 'BO',
    },
    {
        namePtBr: 'Bósnia-Herzegóvina',
        nameInt: 'Bosnia & Herzegovina',
        code: 'BA',
    },
    {
        namePtBr: 'Botsuana',
        nameInt: 'Botswana',
        code: 'BW',
    },
    {
        namePtBr: 'Brasil',
        nameInt: 'Brazil',
        code: 'BR',
    },
    {
        namePtBr: 'Brunei',
        nameInt: 'Brunei',
        code: 'BN',
    },
    {
        namePtBr: 'Bulgária',
        nameInt: 'Bulgaria',
        code: 'BG',
    },
    {
        namePtBr: 'Burkina Fasso',
        nameInt: 'Burkina Faso',
        code: 'BF',
    },
    {
        namePtBr: 'Burundi',
        nameInt: 'Burundi',
        code: 'BI',
    },
    {
        namePtBr: 'Butão',
        nameInt: 'Bhutan',
        code: 'BT',
    },
    {
        namePtBr: 'Cabo Verde',
        nameInt: 'Cape Verde',
        code: 'CV',
    },
    {
        namePtBr: 'Camarões',
        nameInt: 'Cameroon',
        code: 'CM',
    },
    {
        namePtBr: 'Camboja',
        nameInt: 'Cambodia',
        code: 'KH',
    },
    {
        namePtBr: 'Canadá',
        nameInt: 'Canada',
        code: 'CA',
    },
    {
        namePtBr: 'Canárias',
        nameInt: 'Canary Islands',
        code: 'IC',
    },
    {
        namePtBr: 'Cazaquistão',
        nameInt: 'Kazakhstan',
        code: 'KZ',
    },
    {
        namePtBr: 'Ceuta e Melilla',
        nameInt: 'Ceuta & Melilla',
        code: 'EA',
    },
    {
        namePtBr: 'Chade',
        nameInt: 'Chad',
        code: 'TD',
    },
    {
        namePtBr: 'Chile',
        nameInt: 'Chile',
        code: 'CL',
    },
    {
        namePtBr: 'China',
        nameInt: 'China',
        code: 'CN',
    },
    {
        namePtBr: 'Chipre',
        nameInt: 'Cyprus',
        code: 'CY',
    },
    {
        namePtBr: 'Cingapura',
        nameInt: 'Singapore',
        code: 'SG',
    },
    {
        namePtBr: 'Colômbia',
        nameInt: 'Colombia',
        code: 'CO',
    },
    {
        namePtBr: 'Comores',
        nameInt: 'Comoros',
        code: 'KM',
    },
    {
        namePtBr: 'Congo',
        nameInt: 'Congo (Republic)',
        code: 'CG',
    },
    {
        namePtBr: 'Coréia do Norte',
        nameInt: 'North Korea',
        code: 'KP',
    },
    {
        namePtBr: 'Coréia do Sul',
        nameInt: 'South Korea',
        code: 'KR',
    },
    {
        namePtBr: 'Costa do Marfim',
        nameInt: 'Côte d¿Ivoire',
        code: 'CI',
    },
    {
        namePtBr: 'Costa Rica',
        nameInt: 'Costa Rica',
        code: 'CR',
    },
    {
        namePtBr: 'Croácia',
        nameInt: 'Croatia',
        code: 'HR',
    },
    {
        namePtBr: 'Cuba',
        nameInt: 'Cuba',
        code: 'CU',
    },
    {
        namePtBr: 'Curaçao',
        nameInt: 'Curaçao',
        code: 'CW',
    },
    {
        namePtBr: 'Diego Garcia',
        nameInt: 'Diego Garcia',
        code: 'DG',
    },
    {
        namePtBr: 'Dinamarca',
        nameInt: 'Denmark',
        code: 'DK',
    },
    {
        namePtBr: 'Djibuti',
        nameInt: 'Djibouti',
        code: 'DJ',
    },
    {
        namePtBr: 'Dominica',
        nameInt: 'Dominica',
        code: 'DM',
    },
    {
        namePtBr: 'Egito',
        nameInt: 'Egypt',
        code: 'EG',
    },
    {
        namePtBr: 'El Salvador',
        nameInt: 'El Salvador',
        code: 'SV',
    },
    {
        namePtBr: 'Emirados Árabes Unidos',
        nameInt: 'United Arab Emirates',
        code: 'AE',
    },
    {
        namePtBr: 'Equador',
        nameInt: 'Ecuador',
        code: 'EC',
    },
    {
        namePtBr: 'Eritréia',
        nameInt: 'Eritrea',
        code: 'ER',
    },
    {
        namePtBr: 'Eslováquia',
        nameInt: 'Slovakia',
        code: 'SK',
    },
    {
        namePtBr: 'Eslovênia',
        nameInt: 'Slovenia',
        code: 'SI',
    },
    {
        namePtBr: 'Espanha',
        nameInt: 'Spain',
        code: 'ES',
    },
    {
        namePtBr: 'Estados Unidos',
        nameInt: 'United States',
        code: 'US',
    },
    {
        namePtBr: 'Estônia',
        nameInt: 'Estonia',
        code: 'EE',
    },
    {
        namePtBr: 'Etiópia',
        nameInt: 'Ethiopia',
        code: 'ET',
    },
    {
        namePtBr: 'Fiji',
        nameInt: 'Fiji',
        code: 'FJ',
    },
    {
        namePtBr: 'Filipinas',
        nameInt: 'Philippines',
        code: 'PH',
    },
    {
        namePtBr: 'Finlândia',
        nameInt: 'Finland',
        code: 'FI',
    },
    {
        namePtBr: 'França',
        nameInt: 'France',
        code: 'FR',
    },
    {
        namePtBr: 'Gabão',
        nameInt: 'Gabon',
        code: 'GA',
    },
    {
        namePtBr: 'Gâmbia',
        nameInt: 'Gambia',
        code: 'GM',
    },
    {
        namePtBr: 'Gana',
        nameInt: 'Ghana',
        code: 'GH',
    },
    {
        namePtBr: 'Geórgia',
        nameInt: 'Georgia',
        code: 'GE',
    },
    {
        namePtBr: 'Gibraltar',
        nameInt: 'Gibraltar',
        code: 'GI',
    },
    {
        namePtBr: 'Grã-Bretanha (Reino Unido, UK)',
        nameInt: 'United Kingdom',
        code: 'GB',
    },
    {
        namePtBr: 'Granada',
        nameInt: 'Grenada',
        code: 'GD',
    },
    {
        namePtBr: 'Grécia',
        nameInt: 'Greece',
        code: 'GR',
    },
    {
        namePtBr: 'Groelândia',
        nameInt: 'Greenland',
        code: 'GL',
    },
    {
        namePtBr: 'Guadalupe',
        nameInt: 'Guadeloupe',
        code: 'GP',
    },
    {
        namePtBr: 'Guam (Território dos Estados Unidos)',
        nameInt: 'Guam',
        code: 'GU',
    },
    {
        namePtBr: 'Guatemala',
        nameInt: 'Guatemala',
        code: 'GT',
    },
    {
        namePtBr: 'Guernsey',
        nameInt: 'Guernsey',
        code: 'GG',
    },
    {
        namePtBr: 'Guiana',
        nameInt: 'Guyana',
        code: 'GY',
    },
    {
        namePtBr: 'Guiana Francesa',
        nameInt: 'French Guiana',
        code: 'GF',
    },
    {
        namePtBr: 'Guiné',
        nameInt: 'Guinea',
        code: 'GN',
    },
    {
        namePtBr: 'Guiné Equatorial',
        nameInt: 'Equatorial Guinea',
        code: 'GQ',
    },
    {
        namePtBr: 'Guiné-Bissau',
        nameInt: 'Guinea-Bissau',
        code: 'GW',
    },
    {
        namePtBr: 'Haiti',
        nameInt: 'Haiti',
        code: 'HT',
    },
    {
        namePtBr: 'Holanda',
        nameInt: 'Netherlands',
        code: 'NL',
    },
    {
        namePtBr: 'Honduras',
        nameInt: 'Honduras',
        code: 'HN',
    },
    {
        namePtBr: 'Hong Kong',
        nameInt: 'Hong Kong',
        code: 'HK',
    },
    {
        namePtBr: 'Hungria',
        nameInt: 'Hungary',
        code: 'HU',
    },
    {
        namePtBr: 'Iêmen',
        nameInt: 'Yemen',
        code: 'YE',
    },
    {
        namePtBr: 'Ilha Bouvet',
        nameInt: 'Bouvet Island',
        code: 'BV',
    },
    {
        namePtBr: 'Ilha de Ascensão',
        nameInt: 'Ascension Island',
        code: 'AC',
    },
    {
        namePtBr: 'Ilha de Clipperton',
        nameInt: 'Clipperton Island',
        code: 'CP',
    },
    {
        namePtBr: 'Ilha de Man',
        nameInt: 'Isle of Man',
        code: 'IM',
    },
    {
        namePtBr: 'Ilha Natal',
        nameInt: 'Christmas Island',
        code: 'CX',
    },
    {
        namePtBr: 'Ilha Pitcairn',
        nameInt: 'Pitcairn Islands',
        code: 'PN',
    },
    {
        namePtBr: 'Ilha Reunião',
        nameInt: 'Réunion',
        code: 'RE',
    },
    {
        namePtBr: 'Ilhas Aland',
        nameInt: 'Åland Islands',
        code: 'AX',
    },
    {
        namePtBr: 'Ilhas Cayman',
        nameInt: 'Cayman Islands',
        code: 'KY',
    },
    {
        namePtBr: 'Ilhas Cocos',
        nameInt: 'Cocos (Keeling) Islands',
        code: 'CC',
    },
    {
        namePtBr: 'Ilhas Cook',
        nameInt: 'Cook Islands',
        code: 'CK',
    },
    {
        namePtBr: 'Ilhas Faroes',
        nameInt: 'Faroe Islands',
        code: 'FO',
    },
    {
        namePtBr: 'Ilhas Geórgia do Sul e Sandwich do Sul',
        nameInt: 'South Georgia & South Sandwich Islands',
        code: 'GS',
    },
    {
        namePtBr: 'Ilhas Heard e McDonald (Território da Austrália)',
        nameInt: 'Heard & McDonald Islands',
        code: 'HM',
    },
    {
        namePtBr: 'Ilhas Malvinas',
        nameInt: 'Falkland Islands (Islas Malvinas)',
        code: 'FK',
    },
    {
        namePtBr: 'Ilhas Marianas do Norte',
        nameInt: 'Northern Mariana Islands',
        code: 'MP',
    },
    {
        namePtBr: 'Ilhas Marshall',
        nameInt: 'Marshall Islands',
        code: 'MH',
    },
    {
        namePtBr: 'Ilhas Menores dos Estados Unidos',
        nameInt: 'U.S. Outlying Islands',
        code: 'UM',
    },
    {
        namePtBr: 'Ilhas Norfolk',
        nameInt: 'Norfolk Island',
        code: 'NF',
    },
    {
        namePtBr: 'Ilhas Salomão',
        nameInt: 'Solomon Islands',
        code: 'SB',
    },
    {
        namePtBr: 'Ilhas Seychelles',
        nameInt: 'Seychelles',
        code: 'SC',
    },
    {
        namePtBr: 'Ilhas Tokelau',
        nameInt: 'Tokelau',
        code: 'TK',
    },
    {
        namePtBr: 'Ilhas Turks e Caicos',
        nameInt: 'Turks & Caicos Islands',
        code: 'TC',
    },
    {
        namePtBr: 'Ilhas Virgens (Estados Unidos)',
        nameInt: 'U.S. Virgin Islands',
        code: 'VI',
    },
    {
        namePtBr: 'Ilhas Virgens (Inglaterra)',
        nameInt: 'British Virgin Islands',
        code: 'VG',
    },
    {
        namePtBr: 'Índia',
        nameInt: 'India',
        code: 'IN',
    },
    {
        namePtBr: 'Indonésia',
        nameInt: 'Indonesia',
        code: 'ID',
    },
    {
        namePtBr: 'Irã',
        nameInt: 'Iran',
        code: 'IR',
    },
    {
        namePtBr: 'Iraque',
        nameInt: 'Iraq',
        code: 'IQ',
    },
    {
        namePtBr: 'Irlanda',
        nameInt: 'Ireland',
        code: 'IE',
    },
    {
        namePtBr: 'Islândia',
        nameInt: 'Iceland',
        code: 'IS',
    },
    {
        namePtBr: 'Israel',
        nameInt: 'Israel',
        code: 'IL',
    },
    {
        namePtBr: 'Itália',
        nameInt: 'Italy',
        code: 'IT',
    },
    {
        namePtBr: 'Jamaica',
        nameInt: 'Jamaica',
        code: 'JM',
    },
    {
        namePtBr: 'Japão',
        nameInt: 'Japan',
        code: 'JP',
    },
    {
        namePtBr: 'Jersey',
        nameInt: 'Jersey',
        code: 'JE',
    },
    {
        namePtBr: 'Jordânia',
        nameInt: 'Jordan',
        code: 'JO',
    },
    {
        namePtBr: 'Kiribati',
        nameInt: 'Kiribati',
        code: 'KI',
    },
    {
        namePtBr: 'Kosovo',
        nameInt: 'Kosovo',
        code: 'XK',
    },
    {
        namePtBr: 'Kuait',
        nameInt: 'Kuwait',
        code: 'KW',
    },
    {
        namePtBr: 'Laos',
        nameInt: 'Laos',
        code: 'LA',
    },
    {
        namePtBr: 'Lesoto',
        nameInt: 'Lesotho',
        code: 'LS',
    },
    {
        namePtBr: 'Letônia',
        nameInt: 'Latvia',
        code: 'LV',
    },
    {
        namePtBr: 'Líbano',
        nameInt: 'Lebanon',
        code: 'LB',
    },
    {
        namePtBr: 'Libéria',
        nameInt: 'Liberia',
        code: 'LR',
    },
    {
        namePtBr: 'Líbia',
        nameInt: 'Libya',
        code: 'LY',
    },
    {
        namePtBr: 'Liechtenstein',
        nameInt: 'Liechtenstein',
        code: 'LI',
    },
    {
        namePtBr: 'Lituânia',
        nameInt: 'Lithuania',
        code: 'LT',
    },
    {
        namePtBr: 'Luxemburgo',
        nameInt: 'Luxembourg',
        code: 'LU',
    },
    {
        namePtBr: 'Macau',
        nameInt: 'Macau',
        code: 'MO',
    },
    {
        namePtBr: 'Macedônia (República Yugoslava)',
        nameInt: 'Macedonia (FYROM)',
        code: 'MK',
    },
    {
        namePtBr: 'Madagascar',
        nameInt: 'Madagascar',
        code: 'MG',
    },
    {
        namePtBr: 'Malásia',
        nameInt: 'Malaysia',
        code: 'MY',
    },
    {
        namePtBr: 'Malaui',
        nameInt: 'Malawi',
        code: 'MW',
    },
    {
        namePtBr: 'Maldivas',
        nameInt: 'Maldives',
        code: 'MV',
    },
    {
        namePtBr: 'Mali',
        nameInt: 'Mali',
        code: 'ML',
    },
    {
        namePtBr: 'Malta',
        nameInt: 'Malta',
        code: 'MT',
    },
    {
        namePtBr: 'Marrocos',
        nameInt: 'Morocco',
        code: 'MA',
    },
    {
        namePtBr: 'Martinica',
        nameInt: 'Martinique',
        code: 'MQ',
    },
    {
        namePtBr: 'Maurício',
        nameInt: 'Mauritius',
        code: 'MU',
    },
    {
        namePtBr: 'Mauritânia',
        nameInt: 'Mauritania',
        code: 'MR',
    },
    {
        namePtBr: 'Mayotte',
        nameInt: 'Mayotte',
        code: 'YT',
    },
    {
        namePtBr: 'México',
        nameInt: 'Mexico',
        code: 'MX',
    },
    {
        namePtBr: 'Micronésia',
        nameInt: 'Micronesia',
        code: 'FM',
    },
    {
        namePtBr: 'Moçambique',
        nameInt: 'Mozambique',
        code: 'MZ',
    },
    {
        namePtBr: 'Moldova',
        nameInt: 'Moldova',
        code: 'MD',
    },
    {
        namePtBr: 'Mônaco',
        nameInt: 'Monaco',
        code: 'MC',
    },
    {
        namePtBr: 'Mongólia',
        nameInt: 'Mongolia',
        code: 'MN',
    },
    {
        namePtBr: 'Montenegro',
        nameInt: 'Montenegro',
        code: 'ME',
    },
    {
        namePtBr: 'Montserrat',
        nameInt: 'Montserrat',
        code: 'MS',
    },
    {
        namePtBr: 'Myanma',
        nameInt: 'Myanmar (Burma)',
        code: 'MM',
    },
    {
        namePtBr: 'Namíbia',
        nameInt: 'Namibia',
        code: 'NA',
    },
    {
        namePtBr: 'Nauru',
        nameInt: 'Nauru',
        code: 'NR',
    },
    {
        namePtBr: 'Nepal',
        nameInt: 'Nepal',
        code: 'NP',
    },
    {
        namePtBr: 'Nicarágua',
        nameInt: 'Nicaragua',
        code: 'NI',
    },
    {
        namePtBr: 'Níger',
        nameInt: 'Niger',
        code: 'NE',
    },
    {
        namePtBr: 'Nigéria',
        nameInt: 'Nigeria',
        code: 'NG',
    },
    {
        namePtBr: 'Niue',
        nameInt: 'Niue',
        code: 'NU',
    },
    {
        namePtBr: 'Noruega',
        nameInt: 'Norway',
        code: 'NO',
    },
    {
        namePtBr: 'Nova Caledônia',
        nameInt: 'New Caledonia',
        code: 'NC',
    },
    {
        namePtBr: 'Nova Zelândia',
        nameInt: 'New Zealand',
        code: 'NZ',
    },
    {
        namePtBr: 'Omã',
        nameInt: 'Oman',
        code: 'OM',
    },
    {
        namePtBr: 'Países Baixos Caribenhos',
        nameInt: 'Caribbean Netherlands',
        code: 'BQ',
    },
    {
        namePtBr: 'Palau',
        nameInt: 'Palau',
        code: 'PW',
    },
    {
        namePtBr: 'Palestina',
        nameInt: 'Palestine',
        code: 'PS',
    },
    {
        namePtBr: 'Panamá',
        nameInt: 'Panama',
        code: 'PA',
    },
    {
        namePtBr: 'Papua-Nova Guiné',
        nameInt: 'Papua New Guinea',
        code: 'PG',
    },
    {
        namePtBr: 'Paquistão',
        nameInt: 'Pakistan',
        code: 'PK',
    },
    {
        namePtBr: 'Paraguai',
        nameInt: 'Paraguay',
        code: 'PY',
    },
    {
        namePtBr: 'Peru',
        nameInt: 'Peru',
        code: 'PE',
    },
    {
        namePtBr: 'Polinésia Francesa',
        nameInt: 'French Polynesia',
        code: 'PF',
    },
    {
        namePtBr: 'Polônia',
        nameInt: 'Poland',
        code: 'PL',
    },
    {
        namePtBr: 'Porto Rico',
        nameInt: 'Puerto Rico',
        code: 'PR',
    },
    {
        namePtBr: 'Portugal',
        nameInt: 'Portugal',
        code: 'PT',
    },
    {
        namePtBr: 'Qatar',
        nameInt: 'Qatar',
        code: 'QA',
    },
    {
        namePtBr: 'Quênia',
        nameInt: 'Kenya',
        code: 'KE',
    },
    {
        namePtBr: 'Quirguistão',
        nameInt: 'Kyrgyzstan',
        code: 'KG',
    },
    {
        namePtBr: 'República Centro-Africana',
        nameInt: 'Central African Republic',
        code: 'CF',
    },
    {
        namePtBr: 'República Democrática do Congo',
        nameInt: 'Congo (DRC)',
        code: 'CD',
    },
    {
        namePtBr: 'República Dominicana',
        nameInt: 'Dominican Republic',
        code: 'DO',
    },
    {
        namePtBr: 'República Tcheca',
        nameInt: 'Czech Republic',
        code: 'CZ',
    },
    {
        namePtBr: 'Romênia',
        nameInt: 'Romania',
        code: 'RO',
    },
    {
        namePtBr: 'Ruanda',
        nameInt: 'Rwanda',
        code: 'RW',
    },
    {
        namePtBr: 'Rússia (antiga URSS) - Federação Russa',
        nameInt: 'Russia',
        code: 'RU',
    },
    {
        namePtBr: 'Saara Ocidental',
        nameInt: 'Western Sahara',
        code: 'EH',
    },
    {
        namePtBr: 'Saint-Pierre e Miquelon',
        nameInt: 'St. Pierre & Miquelon',
        code: 'PM',
    },
    {
        namePtBr: 'Samoa Americana',
        nameInt: 'American Samoa',
        code: 'AS',
    },
    {
        namePtBr: 'Samoa Ocidental',
        nameInt: 'Samoa',
        code: 'WS',
    },
    {
        namePtBr: 'San Marino',
        nameInt: 'San Marino',
        code: 'SM',
    },
    {
        namePtBr: 'Santa Helena',
        nameInt: 'St. Helena',
        code: 'SH',
    },
    {
        namePtBr: 'Santa Lúcia',
        nameInt: 'St. Lucia',
        code: 'LC',
    },
    {
        namePtBr: 'São Bartolomeu',
        nameInt: 'St. Barthélemy',
        code: 'BL',
    },
    {
        namePtBr: 'São Cristóvão e Névis',
        nameInt: 'St. Kitts & Nevis',
        code: 'KN',
    },
    {
        namePtBr: 'São Martim',
        nameInt: 'St. Martin',
        code: 'MF',
    },
    {
        namePtBr: 'São Martinho',
        nameInt: 'Sint Maarten',
        code: 'SX',
    },
    {
        namePtBr: 'São Tomé e Príncipe',
        nameInt: 'São Tomé & Príncipe',
        code: 'ST',
    },
    {
        namePtBr: 'São Vicente e Granadinas',
        nameInt: 'St. Vincent & Grenadines',
        code: 'VC',
    },
    {
        namePtBr: 'Senegal',
        nameInt: 'Senegal',
        code: 'SN',
    },
    {
        namePtBr: 'Serra Leoa',
        nameInt: 'Sierra Leone',
        code: 'SL',
    },
    {
        namePtBr: 'Sérvia',
        nameInt: 'Serbia',
        code: 'RS',
    },
    {
        namePtBr: 'Síria',
        nameInt: 'Syria',
        code: 'SY',
    },
    {
        namePtBr: 'Somália',
        nameInt: 'Somalia',
        code: 'SO',
    },
    {
        namePtBr: 'Sri Lanka',
        nameInt: 'Sri Lanka',
        code: 'LK',
    },
    {
        namePtBr: 'Suazilândia',
        nameInt: 'Swaziland',
        code: 'SZ',
    },
    {
        namePtBr: 'Sudão',
        nameInt: 'Sudan',
        code: 'SD',
    },
    {
        namePtBr: 'Sudão do Sul',
        nameInt: 'South Sudan',
        code: 'SS',
    },
    {
        namePtBr: 'Suécia',
        nameInt: 'Sweden',
        code: 'SE',
    },
    {
        namePtBr: 'Suíça',
        nameInt: 'Switzerland',
        code: 'CH',
    },
    {
        namePtBr: 'Suriname',
        nameInt: 'Suriname',
        code: 'SR',
    },
    {
        namePtBr: 'Svalbard',
        nameInt: 'Svalbard & Jan Mayen',
        code: 'SJ',
    },
    {
        namePtBr: 'Tadjiquistão',
        nameInt: 'Tajikistan',
        code: 'TJ',
    },
    {
        namePtBr: 'Tailândia',
        nameInt: 'Thailand',
        code: 'TH',
    },
    {
        namePtBr: 'Taiwan',
        nameInt: 'Taiwan',
        code: 'TW',
    },
    {
        namePtBr: 'Tanzânia',
        nameInt: 'Tanzania',
        code: 'TZ',
    },
    {
        namePtBr: 'Território Britânico do Oceano índico',
        nameInt: 'British Indian Ocean Territory',
        code: 'IO',
    },
    {
        namePtBr: 'Territórios do Sul da França',
        nameInt: 'French Southern Territories',
        code: 'TF',
    },
    {
        namePtBr: 'Timor-Leste',
        nameInt: 'Timor-Leste',
        code: 'TL',
    },
    {
        namePtBr: 'Togo',
        nameInt: 'Togo',
        code: 'TG',
    },
    {
        namePtBr: 'Tonga',
        nameInt: 'Tonga',
        code: 'TO',
    },
    {
        namePtBr: 'Trinidad e Tobago',
        nameInt: 'Trinidad & Tobago',
        code: 'TT',
    },
    {
        namePtBr: 'Tristão da Cunha',
        nameInt: 'Tristan da Cunha',
        code: 'TA',
    },
    {
        namePtBr: 'Tunísia',
        nameInt: 'Tunisia',
        code: 'TN',
    },
    {
        namePtBr: 'Turcomenistão',
        nameInt: 'Turkmenistan',
        code: 'TM',
    },
    {
        namePtBr: 'Turquia',
        nameInt: 'Turkey',
        code: 'TR',
    },
    {
        namePtBr: 'Tuvalu',
        nameInt: 'Tuvalu',
        code: 'TV',
    },
    {
        namePtBr: 'Ucrânia',
        nameInt: 'Ukraine',
        code: 'UA',
    },
    {
        namePtBr: 'Uganda',
        nameInt: 'Uganda',
        code: 'UG',
    },
    {
        namePtBr: 'Uruguai',
        nameInt: 'Uruguay',
        code: 'UY',
    },
    {
        namePtBr: 'Uzbequistão',
        nameInt: 'Uzbekistan',
        code: 'UZ',
    },
    {
        namePtBr: 'Vanuatu',
        nameInt: 'Vanuatu',
        code: 'VU',
    },
    {
        namePtBr: 'Vaticano',
        nameInt: 'Vatican City',
        code: 'VA',
    },
    {
        namePtBr: 'Venezuela',
        nameInt: 'Venezuela',
        code: 'VE',
    },
    {
        namePtBr: 'Vietnã',
        nameInt: 'Vietnam',
        code: 'VN',
    },
    {
        namePtBr: 'Wallis e Futuna',
        nameInt: 'Wallis & Futuna',
        code: 'WF',
    },
    {
        namePtBr: 'Zâmbia',
        nameInt: 'Zambia',
        code: 'ZM',
    },
    {
        namePtBr: 'Zimbábue',
        nameInt: 'Zimbabwe',
        code: 'ZW',
    },
];
