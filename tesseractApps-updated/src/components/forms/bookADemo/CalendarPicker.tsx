import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, CheckCircle } from "lucide-react";
import "./CalendarPicker.css";

// Generate all 30-min slots from 09:00 to 17:30
function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 9; h <= 17; h++) {
    for (const m of [0, 30]) {
      if (h === 17 && m === 30) continue; // stop at 5:30 PM inclusive would be fine, skip if desired
      const meridiem = h < 12 ? "AM" : "PM";
      const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
      slots.push(`${hour12}:${m === 0 ? "00" : m} ${meridiem}`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const pad = (n: number) => String(n).padStart(2, "0");

interface Props {
  onChange: (isoString: string) => void;
}

const CalendarPicker: React.FC<Props> = ({ onChange }) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const timeListRef = useRef<HTMLDivElement>(null);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < todayStart;
  };

  const isToday = (day: number) =>
    day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const isDaySelected = (day: number) =>
    selectedDate !== null &&
    day === selectedDate.getDate() &&
    viewMonth === selectedDate.getMonth() &&
    viewYear === selectedDate.getFullYear();

  const selectDay = (day: number) => {
    if (isPast(day)) return;
    const date = new Date(viewYear, viewMonth, day);
    setSelectedDate(date);
    setSelectedTime(null);
    onChange("");
    // Scroll time list to top on date change
    setTimeout(() => timeListRef.current?.scrollTo({ top: 0 }), 0);
  };

  const selectTime = (slot: string) => {
    // If no date selected yet, default to today
    const dateToUse = selectedDate ?? new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (!selectedDate) {
      setSelectedDate(dateToUse);
      setTimeout(() => timeListRef.current?.scrollTo({ top: 0 }), 0);
    }
    setSelectedTime(slot);
    // Parse "9:00 AM" / "12:30 PM" style
    const [timePart, meridiem] = slot.split(" ");
    const [h, m] = timePart.split(":").map(Number);
    const hours = meridiem === "PM" && h !== 12 ? h + 12 : meridiem === "AM" && h === 12 ? 0 : h;
    const dt = new Date(dateToUse);
    dt.setHours(hours, m, 0, 0);
    const iso = `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
    onChange(iso);
  };

  // Scroll selected time slot into view
  useEffect(() => {
    if (selectedTime && timeListRef.current) {
      const el = timeListRef.current.querySelector(".cal-time-row.selected") as HTMLElement | null;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedTime]);

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const formattedSelected = selectedDate
    ? selectedDate.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" })
    : null;

  const selectionSummary = formattedSelected && selectedTime
    ? `${formattedSelected} · ${selectedTime}`
    : null;

  return (
    <div id="cal-picker">
      <div id="cal-inner">
        {/* ── Calendar ── */}
        <div id="cal-left">
          <div id="cal-header">
            <button type="button" className="cal-nav-btn" onClick={prevMonth} aria-label="Previous month">
              <ChevronLeft size={14} />
            </button>
            <span id="cal-month-label">{MONTH_NAMES[viewMonth]} {viewYear}</span>
            <button type="button" className="cal-nav-btn" onClick={nextMonth} aria-label="Next month">
              <ChevronRight size={14} />
            </button>
          </div>

          <div id="cal-days-header">
            {DAY_LABELS.map(d => <span key={d} className="cal-day-label">{d}</span>)}
          </div>

          <div id="cal-grid">
            {cells.map((day, i) =>
              day === null
                ? <span key={`b${i}`} />
                : <button
                    key={day}
                    type="button"
                    className={
                      "cal-day" +
                      (isToday(day) && !isDaySelected(day) ? " today" : "") +
                      (isDaySelected(day) ? " selected" : "") +
                      (isPast(day) ? " past" : "")
                    }
                    onClick={() => selectDay(day)}
                    disabled={isPast(day)}
                  >
                    {day}
                  </button>
            )}
          </div>

          {selectionSummary && (
            <div id="cal-selection-summary">
              <CheckCircle size={13} />
              <span>{selectionSummary}</span>
            </div>
          )}
        </div>

        {/* ── Time scroll list ── */}
        <div id="cal-right" className="visible">
          <div id="cal-time-header">
            <Clock size={13} />
            <span>{formattedSelected ?? "Select a time"}</span>
          </div>
          <div id="cal-time-list" ref={timeListRef}>
            {TIME_SLOTS.map(slot => (
              <button
                key={slot}
                type="button"
                className={"cal-time-row" + (selectedTime === slot ? " selected" : "")}
                onClick={() => selectTime(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPicker;
