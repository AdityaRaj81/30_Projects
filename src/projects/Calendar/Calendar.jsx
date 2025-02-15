import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../../components/layouts/Footer';
import ProjectHeader from '../../components/layouts/ProjectHeader';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowEventForm(false);
  };

  const addEvent = (e) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventTime) return;

    const newEvent = {
      id: uuidv4(),
      title: eventTitle,
      date: selectedDate.toISOString(),
      time: eventTime,
    };

    let updatedEvents;
    if (editingEvent) {
      updatedEvents = events.map(event => event.id === editingEvent.id ? newEvent : event);
    } else {
      updatedEvents = [...events, newEvent];
    }

    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    setEventTitle('');
    setEventTime('');
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const editEvent = (event) => {
    setEditingEvent(event);
    setEventTitle(event.title);
    setEventTime(event.time);
    setShowEventForm(true);
    setSelectedDate(parseISO(event.date));
  };

  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
  };

  const getEventsForDate = (date) => events.filter(event => isSameDay(parseISO(event.date), date));

  return (
    <div className="app">
      <ProjectHeader title="Calendar App" description="Manage your schedule with this interactive calendar" />
      <main className="calendar-main">
        <div className="calendar-container">
          <div className="calendar-header">
            <button onClick={previousMonth} className="month-nav">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h2>{format(currentDate, 'MMMM yyyy')}</h2>
            <button onClick={nextMonth} className="month-nav">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="calendar-grid">
            <div className="weekdays">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>
            <div className="days">
              {monthDays.map(day => {
                const dayEvents = getEventsForDate(day);
                return (
                  <div
                    key={day.toString()}
                    className={`day ${!isSameMonth(day, currentDate) ? 'other-month' : ''} ${isSameDay(day, selectedDate) ? 'selected' : ''} ${isSameDay(day, new Date()) ? 'today' : ''}`}
                    onClick={() => handleDateClick(day)}
                  >
                    <span className="day-number">{format(day, 'd')}</span>
                    {dayEvents.length > 0 && (
                      <div className="event-dots">
                        {dayEvents.slice(0, 3).map(event => <div key={event.id} className="event-dot" />)}
                        {dayEvents.length > 3 && <span>+{dayEvents.length - 3}</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {selectedDate && (
            <div className="events-panel">
              <div className="selected-date">
                <h3>{format(selectedDate, 'MMMM d, yyyy')}</h3>
                <button onClick={() => setShowEventForm(true)} className="add-event-button">
                  <FontAwesomeIcon icon={faPlus} /> Add Event
                </button>
              </div>

              {showEventForm && (
                <form onSubmit={addEvent} className="event-form">
                  <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="Event title" className="event-input" />
                  <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="event-input" />
                  <button type="submit" className="submit-event">{editingEvent ? 'Update' : 'Add'} Event</button>
                </form>
              )}

              <div className="events-list">
                {getEventsForDate(selectedDate).map(event => (
                  <div key={event.id} className="event-item">
                    <div className="event-info">
                      <span className="event-time">{event.time}</span>
                      <span className="event-title">{event.title}</span>
                    </div>
                    <div className="event-actions">
                      <button className="event-action edit" onClick={() => editEvent(event)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="event-action delete" onClick={() => deleteEvent(event.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calendar;
