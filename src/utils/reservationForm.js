export const AVAILABLE_TIMES = [
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
]

export const HALLS = [
  {
    id: 'Sala Główna',
    label: 'Sala Główna',
    placeholder: 'Wnętrze',
    description:
      'Przeszklona sala z eleganckim wykończeniem. Idealna na kolacje i spotkania rodzinne.',
  },
  {
    id: 'Sala VIP',
    label: 'Sala VIP',
    placeholder: 'VIP',
    description:
      'Kameralna przestrzeń z ekskluzywnym wystrojem. Wyposażona w sprzęt AV.',
  },
  {
    id: 'Ogródek Letni',
    label: 'Ogródek Letni',
    placeholder: 'Ogród',
    description:
      'Strefa na zewnątrz z widokiem na ogród. Doskonała na ciepłe wieczory.',
  },
]

export function buildReservationFields(formData, serviceDate) {
  return {
    customerName: formData.name.trim(),
    customerPhone: formData.phone.trim(),
    customerEmail: formData.email.trim(),
    serviceDate,
    time: formData.selectedTime,
    guests: Number(formData.guests),
    hall: formData.selectedHall,
    notes: formData.notes.trim(),
    status: 'pending',
  }
}

export function validateReservationFields(
  fields,
  minimumDate,
  maximumDate,
) {
  if (
    fields.serviceDate < minimumDate ||
    fields.serviceDate > maximumDate
  ) {
    return 'Wybierz datę od dzisiaj do 180 dni naprzód.'
  }

  if (!AVAILABLE_TIMES.includes(fields.time)) {
    return 'Wybierz dostępną godzinę rezerwacji.'
  }

  if (!Number.isInteger(fields.guests) || fields.guests < 1 || fields.guests > 20) {
    return 'Liczba gości musi wynosić od 1 do 20.'
  }

  if (!HALLS.some(({ id }) => id === fields.hall)) {
    return 'Wybierz salę.'
  }

  if (
    fields.customerName.length < 2 ||
    fields.customerName.length > 100
  ) {
    return 'Imię i nazwisko musi mieć od 2 do 100 znaków.'
  }

  if (
    fields.customerPhone.length < 7 ||
    fields.customerPhone.length > 20
  ) {
    return 'Numer telefonu musi mieć od 7 do 20 znaków.'
  }

  if (
    fields.customerEmail.length < 5 ||
    fields.customerEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.customerEmail)
  ) {
    return 'Podaj poprawny adres e-mail.'
  }

  if (fields.notes.length > 500) {
    return 'Uwagi mogą mieć maksymalnie 500 znaków.'
  }

  return ''
}
