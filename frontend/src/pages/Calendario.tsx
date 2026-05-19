import React from 'react';


const calendarDays = [
  { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 },
  { day: 7 }, { day: 8, available: true }, { day: 9, available: true }, { day: 10, available: true },
  { day: 11 }, { day: 12 }, { day: 13 }, { day: 14, partlyAvailable: true }, { day: 15, partlyAvailable: true },
  { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 },
  { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 },
  { day: 26 }, { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 },
];
export default function Calendario() {
    return (
    <div className="card">
    <div className="card-header">
    <div className="card-title">Calendário de Disponibilidade</div>
    <div className="calendar-header">
    <select className="select-field"><option>Mensal</option></select>
    <select className="select-field"><option>Outubro</option></select>
    </div>
    </div>
    <div className="calendar-grid">
    <div className="calendar-header-cell">Dom</div>
    <div className="calendar-header-cell">Seg</div>
    <div className="calendar-header-cell">Ter</div>
    <div className="calendar-header-cell">Qua</div>
    <div className="calendar-header-cell">Qui</div>
    <div className="calendar-header-cell">Sex</div>
    <div className="calendar-header-cell">Sab</div>

    {/* Dias vazios para começar no dia certo */}
    {Array.from({ length: 1 }).map((_, i) => (
    <div key={`empty-${i}`} className="calendar-day calendar-day-empty"></div>
    ))}

    {/* Dias do calendário */}
    {calendarDays.map((day, index) => {
    let dayClass = 'calendar-day calendar-day-unavailable';
    if (day.available) {
    dayClass = 'calendar-day calendar-day-available';
    } else if (day.partlyAvailable) {
    dayClass = 'calendar-day calendar-day-partly-available';
    }
    return (
    <div key={index} className={dayClass}>
    {day.day}
    </div>
    );
    })}
    </div>
    </div>
    );
}
