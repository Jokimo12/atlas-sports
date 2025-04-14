export const teams = [
    { id: '1', name: 'New York Yankees', icon: require('../assets/images/yankeesicon.png'), year: '2024-2025' },
    { id: '2', name: 'Boston Red Sox', icon: require('../assets/images/BRSicon.png'), year: '2024-2025'},
    { id: '3', name: 'Los Angeles Dodgers', icon: require('../assets/images/LADodgers.png'), year: '2024-2025'},
    { id: '4', name: 'Chicago Cubs', icon: require('../assets/images/chicagocubs.png'), year: '2024-2025' },
    { id: '5', name: 'Houston Astros', icon: require('../assets/images/houstonAstrosIcon.png'), year: '2024-2025'},
];

export type Team = typeof teams[0];