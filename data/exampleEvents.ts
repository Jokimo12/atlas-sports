export interface Event {
    id: string;
    opponent: string;
    date: string;
    time: string;
    location: string;
    coachesNotes: string;
    checkIn: string;
    checkOut: string;
    team: string;
}

export const exampleEvents: Record<string, Event[]> = {
   
    '2025-05-03': [
        {
            id: '2',
            opponent: 'Red Dragons',
            date: 'Sat, May 3, 2025',
            time: '2:00 PM',
            location: 'Central Park Courts',
            coachesNotes: 'Bring both home and away jerseys',
            checkIn: '1:00 PM',
            checkOut: '4:00 PM',
            team: 'New York Yankees'
        },
        {
            id: '3',
            opponent: 'Blue Eagles',
            date: 'Sat, May 3, 2025',
            time: '6:00 PM',
            location: 'Riverside Fields',
            coachesNotes: 'Pre-game meeting at 5:45 PM',
            checkIn: '5:30 PM',
            checkOut: '8:30 PM',
            team: 'Boston Red Sox'
        }
    ],
    '2025-04-28': [
        {
            id: '4',
            opponent: 'Green Sharks',
            date: 'Wed, Apr 28, 2025',
            time: '3:30 PM',
            location: 'Sandy Beach',
            coachesNotes: 'Bring water and sunscreen',
            checkIn: '2:30 PM',
            checkOut: '5:30 PM',
            team: 'Los Angeles Dodgers'
        }
    ],
    
    '2025-05-06': [
        {
            id: '5',
            opponent: 'Yellow Tigers',
            date: 'Thu, May 8, 2025',
            time: '1:00 PM',
            location: 'Tennis Center',
            coachesNotes: 'Great game everyone!',
            checkIn: '12:00 PM',
            checkOut: '3:00 PM',
            team: 'Chicago Cubs'
        }
    ]
}; 