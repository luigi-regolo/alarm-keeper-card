/**
 * Alarm Keeper Card — Home Assistant dashboard card. Version 1.1
 * Copyright (c) 2026 luigi-regolo. SPDX-License-Identifier: GPL-3.0-only.
 * Works on the alarm_control_panel domain and on device classes, so it fits any alarm integration.
 * The alarm code is typed every time, is sent to Home Assistant and is never stored.
 * No external scripts, fonts, analytics or assets.
 */
(() => {
  'use strict';

  const VERSION = '1.1';
  const TAG = 'alarm-keeper-card';
  const EDITOR_TAG = 'alarm-keeper-card-editor';

  /* ---------------------------------------------------------- languages */
  // Italian, English, German and French. The language follows the Home Assistant user; English is the fallback.
  const LANGS = [['it', 'Italiano'], ['en', 'English'], ['de', 'Deutsch'], ['fr', 'Français']];
  const TR = {
  it: {
    "m_doors": "Porte",
    "m_windows": "Finestre",
    "m_motion": "Volumetrici",
    "m_batteries": "Batterie",
    "m_cameras": "Telecamere",
    "m_siren": "Sirena",
    "m_tamper": "Manomissione",
    "m_station": "Centrale",
    "m_volumes": "Volumi",
    "m_settings": "Impostazioni",
    "h_doors": "Sensori porta e porta garage.",
    "h_windows": "Sensori finestra o apertura.",
    "h_motion": "Sensori di movimento e presenza, con l’ultimo movimento.",
    "h_batteries": "Livello delle batterie dei dispositivi dell’allarme.",
    "h_cameras": "Telecamere opzionali, un tocco apre i dettagli.",
    "h_siren": "Accende e spegne la sirena, con conferma prima di attivarla.",
    "h_tamper": "Sensori di manomissione.",
    "h_station": "Informazioni e stato della centrale.",
    "h_volumes": "Volume della sirena e della tastiera. Sola lettura, si modifica con il lucchetto.",
    "h_settings": "Modalità di esclusione, suoni e altre scelte.",
    "alarm": "Allarme",
    "u_now": "ora",
    "u_d": "g",
    "d_lt1": "meno di 1 min",
    "at_today": "alle {t}",
    "at_yday": "ieri alle {t}",
    "at_date": "il {d} alle {t}",
    "err_cfg": "Configurazione non valida",
    "nf": "Non trovata",
    "ent_nf": "Entità non trovata",
    "na": "Non disponibile",
    "ok": "Ok",
    "s_open": "Aperta",
    "s_open_since": "Aperta da {s}",
    "s_closed": "Chiusa",
    "s_closed_since": "Chiusa · da {s}",
    "s_motion_on": "Movimento in corso",
    "s_motion_off": "Nessun movimento",
    "s_motion_last": "{m} · ultimo {t}",
    "s_tamper": "Manomissione",
    "s_low": "Bassa",
    "s_invalid": "Valore non valido",
    "s_on": "Attiva",
    "s_off": "Spenta",
    "sum_open_1": "{o} aperta su {n}",
    "sum_open_n": "{o} aperte su {n}",
    "sum_na_1": "{n} non disponibile",
    "sum_na_n": "{n} non disponibili",
    "sum_closed1": "Chiusa",
    "sum_allclosed": "Tutte chiuse",
    "sum_act_1": "{n} attivo",
    "sum_act_n": "{n} attivi",
    "sum_none_m": "Nessuno",
    "sum_tamper_1": "{n} manomissione",
    "sum_tamper_n": "{n} manomissioni",
    "sum_none_f": "Nessuna",
    "sum_low_1": "{n} bassa",
    "sum_low_n": "{n} basse",
    "sum_allok": "Tutte ok",
    "sum_cam_1": "{n} attiva",
    "sum_cam_n": "{n} attive",
    "sum_vols": "{n} volumi",
    "sum_sets": "{n} impostazioni",
    "sum_all": "Tutto ok",
    "home": "In casa",
    "away": "Fuori casa",
    "disarmed": "Disinserito",
    "trig": "Scattato",
    "arming": "Inserimento",
    "entry": "Ingresso",
    "disarming": "Disinserimento",
    "na_s": "Non disp.",
    "since_t": "dalle {t}",
    "since_ago": "da {s}",
    "dial_aria": "Quadrante dell’allarme: {l}",
    "c_disarm": "Disattiva",
    "cmd_fail": "Comando non riuscito. Riprova.",
    "cmd_fail_s": "Comando non riuscito.",
    "code_bad": "Codice non corretto o comando rifiutato.",
    "vol_fail": "Volume non modificato.",
    "sir_off_fail": "Sirena non spenta.",
    "sir_on_fail": "Sirena non attivata.",
    "set_fail": "Impostazione non modificata.",
    "a_lock_vol": "Blocca la modifica di {n}",
    "a_unlock_vol": "Sblocca la modifica di {n}",
    "a_dec": "Diminuisci {n}",
    "a_inc": "Aumenta {n}",
    "a_siren": "Sirena {n}",
    "g_ok": "Tutto ok",
    "g_att_1": "{n} in attenzione",
    "g_att_n": "{n} in attenzione",
    "g_allgood": "Tutto in ordine",
    "g_noalerts_l": "nessuna segnalazione",
    "g_noalerts": "Nessuna segnalazione",
    "close": "Chiudi",
    "details": "Dettagli e stato",
    "f_att": "Attenzione",
    "f_all": "Tutti",
    "sir_off_q": "Spegnere la sirena?",
    "sir_on_q": "Attivare la sirena?",
    "sir_off_p": "La sirena verrà spenta subito.",
    "sir_on_p": "La sirena suonerà subito. Potrai spegnerla da qui.",
    "cancel": "Annulla",
    "sir_off_b": "Spegni sirena",
    "sir_on_b": "Attiva sirena",
    "l_home": "In casa",
    "l_away": "Fuori casa",
    "l_off": "Disinserito",
    "l_trig": "Allarme scattato",
    "l_pend": "In corso",
    "l_unk": "Non disponibile",
    "code": "Codice",
    "now": "Ora",
    "after_cmd": "Dopo il comando",
    "code_req": "Codice richiesto",
    "no_code": "Nessun codice impostato in Home Assistant: il tastierino non verifica nulla.",
    "del_digit": "Cancella l’ultima cifra",
    "sending": "Invio…",
    "k_disarm": "Disattiva allarme",
    "k_home": "Inserisci in casa",
    "k_away": "Inserisci fuori casa",
    "code_note": "Il codice si digita ogni volta e non viene mai salvato. Lo verifica Home Assistant.",
    "empty_entity": "Scegli l’entità dell’allarme dalla configurazione della card.",
    "empty_mods": "Nessun modulo con entità: scegli le entità dalla configurazione della card.",
    "leg_today": "Oggi inserito {d}",
    "leg_not": "Non inserito",
    "leg_p": "Quadrante da 12 ore: ora mostra {w}.",
    "w_pm": "il pomeriggio (12–24)",
    "w_am": "la mattina (0–12)",
    "leg_nohist": " Storico non disponibile: mostro solo lo stato attuale.",
    "secs": "Sezioni",
    "tAl": "Allarme",
    "tMo": "Moduli",
    "tAs": "Aspetto",
    "al_desc": "Scegli la centrale e come si presenta il pannello. Il codice non viene mai salvato nella card: lo digiti ogni volta e lo verifica Home Assistant.",
    "e_entity": "Entità allarme",
    "e_entity_h": "Qualsiasi entità del dominio alarm_control_panel.",
    "e_panel": "Pannello allarme",
    "e_panel_h": "Quadrante con le ore di oggi, comandi e riquadri. Spento: la card mostra solo i moduli scelti.",
    "e_cmds": "Comandi attivi",
    "e_cmds_h": "Pulsanti In casa, Fuori casa e Disattiva. Spenti: il pannello resta in sola lettura.",
    "e_leg": "Legenda al tocco",
    "e_leg_h": "Toccando il quadrante compaiono i colori e il totale di oggi.",
    "e_hands": "Lancette",
    "e_hands_h": "Spente di default: il punto sul bordo segna già l’ora attuale.",
    "mod_head": "Moduli",
    "mod_desc": "Scegli le entità di ogni modulo dai selettori. Un modulo senza entità non compare. Ogni modulo funziona anche da solo: per averne uno solo su una card, spegni il pannello allarme e lascia attivo solo quel modulo.",
    "mv_up": "Sposta su {n}",
    "mv_dn": "Sposta giù {n}",
    "mod_on": "Modulo attivo",
    "mod_tile": "Riga nell’elenco della card",
    "room_add": "Aggiungi da stanza",
    "room_pick": "Scegli una stanza…",
    "room_h": "Aggiunge i dispositivi compatibili di quella stanza. Puoi sempre toglierne qualcuno dal selettore.",
    "eyebrow": "Intestazione superiore",
    "title": "Titolo",
    "title_h": "Il punto verde finale lo aggiunge la card.",
    "show_eyebrow": "Mostra intestazione superiore",
    "show_title": "Mostra titolo",
    "full": "Tutta la larghezza disponibile su tablet e desktop",
    "full_h": "Se è disattivato la card resta stretta (460 px) al centro.",
    "theme": "Tema",
    "th_auto": "Automatico (Home Assistant)",
    "lang": "Lingua",
    "lang_auto": "Automatica (Home Assistant)",
    "lang_h": "Automatica segue la lingua dell’utente in Home Assistant. Se la lingua non è disponibile si usa l’inglese."
  },
  en: {
    "m_doors": "Doors",
    "m_windows": "Windows",
    "m_motion": "Motion",
    "m_batteries": "Batteries",
    "m_cameras": "Cameras",
    "m_siren": "Siren",
    "m_tamper": "Tamper",
    "m_station": "Base station",
    "m_volumes": "Volumes",
    "m_settings": "Settings",
    "h_doors": "Door and garage door sensors.",
    "h_windows": "Window or opening sensors.",
    "h_motion": "Motion and presence sensors, with the last movement.",
    "h_batteries": "Battery level of the alarm devices.",
    "h_cameras": "Optional cameras, a tap opens the details.",
    "h_siren": "Turns the siren on and off, with confirmation before activating it.",
    "h_tamper": "Tamper sensors.",
    "h_station": "Base station information and status.",
    "h_volumes": "Siren and keypad volume. Read-only, change it with the padlock.",
    "h_settings": "Bypass mode, sounds and other choices.",
    "alarm": "Alarm",
    "u_now": "now",
    "u_d": "d",
    "d_lt1": "less than 1 min",
    "at_today": "at {t}",
    "at_yday": "yesterday at {t}",
    "at_date": "on {d} at {t}",
    "err_cfg": "Invalid configuration",
    "nf": "Not found",
    "ent_nf": "Entity not found",
    "na": "Unavailable",
    "ok": "OK",
    "s_open": "Open",
    "s_open_since": "Open for {s}",
    "s_closed": "Closed",
    "s_closed_since": "Closed · for {s}",
    "s_motion_on": "Motion detected",
    "s_motion_off": "No motion",
    "s_motion_last": "{m} · last {t}",
    "s_tamper": "Tamper",
    "s_low": "Low",
    "s_invalid": "Invalid value",
    "s_on": "Active",
    "s_off": "Off",
    "sum_open_1": "{o} of {n} open",
    "sum_open_n": "{o} of {n} open",
    "sum_na_1": "{n} unavailable",
    "sum_na_n": "{n} unavailable",
    "sum_closed1": "Closed",
    "sum_allclosed": "All closed",
    "sum_act_1": "{n} active",
    "sum_act_n": "{n} active",
    "sum_none_m": "None",
    "sum_tamper_1": "{n} tamper alert",
    "sum_tamper_n": "{n} tamper alerts",
    "sum_none_f": "None",
    "sum_low_1": "{n} low",
    "sum_low_n": "{n} low",
    "sum_allok": "All OK",
    "sum_cam_1": "{n} active",
    "sum_cam_n": "{n} active",
    "sum_vols": "{n} volumes",
    "sum_sets": "{n} settings",
    "sum_all": "All OK",
    "home": "Home",
    "away": "Away",
    "disarmed": "Disarmed",
    "trig": "Triggered",
    "arming": "Arming",
    "entry": "Entry",
    "disarming": "Disarming",
    "na_s": "N/A",
    "since_t": "since {t}",
    "since_ago": "for {s}",
    "dial_aria": "Alarm clock dial: {l}",
    "c_disarm": "Disarm",
    "cmd_fail": "Command failed. Try again.",
    "cmd_fail_s": "Command failed.",
    "code_bad": "Wrong code or command rejected.",
    "vol_fail": "Volume not changed.",
    "sir_off_fail": "Siren not turned off.",
    "sir_on_fail": "Siren not turned on.",
    "set_fail": "Setting not changed.",
    "a_lock_vol": "Lock editing of {n}",
    "a_unlock_vol": "Unlock editing of {n}",
    "a_dec": "Decrease {n}",
    "a_inc": "Increase {n}",
    "a_siren": "Siren {n}",
    "g_ok": "All OK",
    "g_att_1": "{n} needs attention",
    "g_att_n": "{n} need attention",
    "g_allgood": "All good",
    "g_noalerts_l": "no alerts",
    "g_noalerts": "No alerts",
    "close": "Close",
    "details": "Details and status",
    "f_att": "Attention",
    "f_all": "All",
    "sir_off_q": "Turn the siren off?",
    "sir_on_q": "Turn the siren on?",
    "sir_off_p": "The siren will be turned off immediately.",
    "sir_on_p": "The siren will sound immediately. You can turn it off from here.",
    "cancel": "Cancel",
    "sir_off_b": "Turn siren off",
    "sir_on_b": "Turn siren on",
    "l_home": "Home",
    "l_away": "Away",
    "l_off": "Disarmed",
    "l_trig": "Alarm triggered",
    "l_pend": "In progress",
    "l_unk": "Unavailable",
    "code": "Code",
    "now": "Now",
    "after_cmd": "After the command",
    "code_req": "Code required",
    "no_code": "No code set in Home Assistant: the keypad checks nothing.",
    "del_digit": "Delete the last digit",
    "sending": "Sending…",
    "k_disarm": "Disarm alarm",
    "k_home": "Arm home",
    "k_away": "Arm away",
    "code_note": "The code is typed every time and is never saved. Home Assistant checks it.",
    "empty_entity": "Choose the alarm entity in the card settings.",
    "empty_mods": "No module with entities: choose the entities in the card settings.",
    "leg_today": "Armed today {d}",
    "leg_not": "Not armed",
    "leg_p": "12-hour dial: now showing {w}.",
    "w_pm": "the afternoon (12–24)",
    "w_am": "the morning (0–12)",
    "leg_nohist": " History not available: showing only the current state.",
    "secs": "Sections",
    "tAl": "Alarm",
    "tMo": "Modules",
    "tAs": "Appearance",
    "al_desc": "Choose the alarm panel and how the panel looks. The code is never saved in the card: you type it every time and Home Assistant checks it.",
    "e_entity": "Alarm entity",
    "e_entity_h": "Any entity of the alarm_control_panel domain.",
    "e_panel": "Alarm panel",
    "e_panel_h": "Dial with today’s hours, commands and tiles. Off: the card only shows the chosen modules.",
    "e_cmds": "Commands enabled",
    "e_cmds_h": "Home, Away and Disarm buttons. Off: the panel stays read-only.",
    "e_leg": "Legend on tap",
    "e_leg_h": "Tapping the dial shows the colours and today’s total.",
    "e_hands": "Clock hands",
    "e_hands_h": "Off by default: the dot on the rim already marks the current time.",
    "mod_head": "Modules",
    "mod_desc": "Choose each module’s entities with the pickers. A module without entities is not shown. Every module also works on its own: to have just one on a card, turn off the alarm panel and keep only that module on.",
    "mv_up": "Move {n} up",
    "mv_dn": "Move {n} down",
    "mod_on": "Module enabled",
    "mod_tile": "Row in the card list",
    "room_add": "Add from room",
    "room_pick": "Choose a room…",
    "room_h": "Adds the compatible devices of that room. You can always remove some from the picker.",
    "eyebrow": "Top label",
    "title": "Title",
    "title_h": "The green dot at the end is added by the card.",
    "show_eyebrow": "Show top label",
    "show_title": "Show title",
    "full": "Full available width on tablet and desktop",
    "full_h": "If off, the card stays narrow (460 px) and centred.",
    "theme": "Theme",
    "th_auto": "Automatic (Home Assistant)",
    "lang": "Language",
    "lang_auto": "Automatic (Home Assistant)",
    "lang_h": "Automatic follows the user’s language in Home Assistant. If the language is not available, English is used."
  },
  de: {
    "m_doors": "Türen",
    "m_windows": "Fenster",
    "m_motion": "Bewegung",
    "m_batteries": "Batterien",
    "m_cameras": "Kameras",
    "m_siren": "Sirene",
    "m_tamper": "Sabotage",
    "m_station": "Zentrale",
    "m_volumes": "Lautstärken",
    "m_settings": "Einstellungen",
    "h_doors": "Tür- und Garagentorsensoren.",
    "h_windows": "Fenster- oder Öffnungssensoren.",
    "h_motion": "Bewegungs- und Präsenzsensoren mit der letzten Bewegung.",
    "h_batteries": "Batteriestand der Alarmgeräte.",
    "h_cameras": "Optionale Kameras, ein Tippen öffnet die Details.",
    "h_siren": "Schaltet die Sirene ein und aus, mit Bestätigung vor dem Aktivieren.",
    "h_tamper": "Sabotagesensoren.",
    "h_station": "Informationen und Status der Zentrale.",
    "h_volumes": "Lautstärke von Sirene und Tastatur. Nur lesend, mit dem Schloss änderbar.",
    "h_settings": "Ausschlussmodus, Töne und weitere Optionen.",
    "alarm": "Alarm",
    "u_now": "jetzt",
    "u_d": "T",
    "d_lt1": "weniger als 1 Min.",
    "at_today": "um {t}",
    "at_yday": "gestern um {t}",
    "at_date": "am {d} um {t}",
    "err_cfg": "Ungültige Konfiguration",
    "nf": "Nicht gefunden",
    "ent_nf": "Entität nicht gefunden",
    "na": "Nicht verfügbar",
    "ok": "OK",
    "s_open": "Offen",
    "s_open_since": "Offen seit {s}",
    "s_closed": "Geschlossen",
    "s_closed_since": "Geschlossen · seit {s}",
    "s_motion_on": "Bewegung erkannt",
    "s_motion_off": "Keine Bewegung",
    "s_motion_last": "{m} · zuletzt {t}",
    "s_tamper": "Sabotage",
    "s_low": "Schwach",
    "s_invalid": "Ungültiger Wert",
    "s_on": "Aktiv",
    "s_off": "Aus",
    "sum_open_1": "{o} von {n} offen",
    "sum_open_n": "{o} von {n} offen",
    "sum_na_1": "{n} nicht verfügbar",
    "sum_na_n": "{n} nicht verfügbar",
    "sum_closed1": "Geschlossen",
    "sum_allclosed": "Alle geschlossen",
    "sum_act_1": "{n} aktiv",
    "sum_act_n": "{n} aktiv",
    "sum_none_m": "Keine",
    "sum_tamper_1": "{n} Sabotage",
    "sum_tamper_n": "{n} Sabotagen",
    "sum_none_f": "Keine",
    "sum_low_1": "{n} schwach",
    "sum_low_n": "{n} schwach",
    "sum_allok": "Alle in Ordnung",
    "sum_cam_1": "{n} aktiv",
    "sum_cam_n": "{n} aktiv",
    "sum_vols": "{n} Lautstärken",
    "sum_sets": "{n} Einstellungen",
    "sum_all": "Alles in Ordnung",
    "home": "Zuhause",
    "away": "Abwesend",
    "disarmed": "Unscharf",
    "trig": "Ausgelöst",
    "arming": "Schärfen",
    "entry": "Eingang",
    "disarming": "Entschärfen",
    "na_s": "N. verf.",
    "since_t": "seit {t}",
    "since_ago": "seit {s}",
    "dial_aria": "Alarm-Zifferblatt: {l}",
    "c_disarm": "Deaktivieren",
    "cmd_fail": "Befehl fehlgeschlagen. Versuche es erneut.",
    "cmd_fail_s": "Befehl fehlgeschlagen.",
    "code_bad": "Falscher Code oder Befehl abgelehnt.",
    "vol_fail": "Lautstärke nicht geändert.",
    "sir_off_fail": "Sirene nicht ausgeschaltet.",
    "sir_on_fail": "Sirene nicht eingeschaltet.",
    "set_fail": "Einstellung nicht geändert.",
    "a_lock_vol": "Bearbeitung von {n} sperren",
    "a_unlock_vol": "Bearbeitung von {n} entsperren",
    "a_dec": "{n} verringern",
    "a_inc": "{n} erhöhen",
    "a_siren": "Sirene {n}",
    "g_ok": "Alles in Ordnung",
    "g_att_1": "{n} zu beachten",
    "g_att_n": "{n} zu beachten",
    "g_allgood": "Alles in Ordnung",
    "g_noalerts_l": "keine Meldungen",
    "g_noalerts": "Keine Meldungen",
    "close": "Schließen",
    "details": "Details und Status",
    "f_att": "Achtung",
    "f_all": "Alle",
    "sir_off_q": "Sirene ausschalten?",
    "sir_on_q": "Sirene einschalten?",
    "sir_off_p": "Die Sirene wird sofort ausgeschaltet.",
    "sir_on_p": "Die Sirene ertönt sofort. Du kannst sie hier ausschalten.",
    "cancel": "Abbrechen",
    "sir_off_b": "Sirene aus",
    "sir_on_b": "Sirene ein",
    "l_home": "Zuhause",
    "l_away": "Abwesend",
    "l_off": "Unscharf",
    "l_trig": "Alarm ausgelöst",
    "l_pend": "In Bearbeitung",
    "l_unk": "Nicht verfügbar",
    "code": "Code",
    "now": "Jetzt",
    "after_cmd": "Nach dem Befehl",
    "code_req": "Code erforderlich",
    "no_code": "In Home Assistant ist kein Code festgelegt: Die Tastatur prüft nichts.",
    "del_digit": "Letzte Ziffer löschen",
    "sending": "Wird gesendet…",
    "k_disarm": "Alarm deaktivieren",
    "k_home": "Zuhause aktivieren",
    "k_away": "Abwesend aktivieren",
    "code_note": "Der Code wird jedes Mal eingegeben und nie gespeichert. Home Assistant prüft ihn.",
    "empty_entity": "Wähle die Alarm-Entität in den Karteneinstellungen.",
    "empty_mods": "Kein Modul mit Entitäten: Wähle die Entitäten in den Karteneinstellungen.",
    "leg_today": "Heute scharf {d}",
    "leg_not": "Nicht scharf",
    "leg_p": "12-Stunden-Zifferblatt: zeigt jetzt {w}.",
    "w_pm": "den Nachmittag (12–24)",
    "w_am": "den Vormittag (0–12)",
    "leg_nohist": " Verlauf nicht verfügbar: Es wird nur der aktuelle Status angezeigt.",
    "secs": "Bereiche",
    "tAl": "Alarm",
    "tMo": "Module",
    "tAs": "Darstellung",
    "al_desc": "Wähle die Alarmzentrale und das Aussehen des Panels. Der Code wird nie in der Karte gespeichert: Du gibst ihn jedes Mal ein und Home Assistant prüft ihn.",
    "e_entity": "Alarm-Entität",
    "e_entity_h": "Jede Entität der Domain alarm_control_panel.",
    "e_panel": "Alarmpanel",
    "e_panel_h": "Zifferblatt mit den Stunden von heute, Befehlen und Kacheln. Aus: Die Karte zeigt nur die gewählten Module.",
    "e_cmds": "Befehle aktiv",
    "e_cmds_h": "Schaltflächen Zuhause, Abwesend und Deaktivieren. Aus: Das Panel bleibt schreibgeschützt.",
    "e_leg": "Legende per Antippen",
    "e_leg_h": "Beim Antippen des Zifferblatts erscheinen die Farben und die Summe von heute.",
    "e_hands": "Zeiger",
    "e_hands_h": "Standardmäßig aus: Der Punkt am Rand zeigt bereits die aktuelle Uhrzeit.",
    "mod_head": "Module",
    "mod_desc": "Wähle die Entitäten jedes Moduls mit den Auswahlfeldern. Ein Modul ohne Entitäten wird nicht angezeigt. Jedes Modul funktioniert auch allein: Um nur eines auf einer Karte zu haben, schalte das Alarmpanel aus und lasse nur dieses Modul aktiv.",
    "mv_up": "{n} nach oben",
    "mv_dn": "{n} nach unten",
    "mod_on": "Modul aktiv",
    "mod_tile": "Zeile in der Kartenliste",
    "room_add": "Aus Raum hinzufügen",
    "room_pick": "Raum wählen…",
    "room_h": "Fügt die kompatiblen Geräte dieses Raums hinzu. Du kannst jederzeit einzelne im Auswahlfeld entfernen.",
    "eyebrow": "Obere Zeile",
    "title": "Titel",
    "title_h": "Den grünen Punkt am Ende fügt die Karte hinzu.",
    "show_eyebrow": "Obere Zeile anzeigen",
    "show_title": "Titel anzeigen",
    "full": "Volle verfügbare Breite auf Tablet und Desktop",
    "full_h": "Wenn aus, bleibt die Karte schmal (460 px) und zentriert.",
    "theme": "Design",
    "th_auto": "Automatisch (Home Assistant)",
    "lang": "Sprache",
    "lang_auto": "Automatisch (Home Assistant)",
    "lang_h": "Automatisch folgt der Sprache des Benutzers in Home Assistant. Ist die Sprache nicht verfügbar, wird Englisch verwendet."
  },
  fr: {
    "m_doors": "Portes",
    "m_windows": "Fenêtres",
    "m_motion": "Mouvement",
    "m_batteries": "Batteries",
    "m_cameras": "Caméras",
    "m_siren": "Sirène",
    "m_tamper": "Sabotage",
    "m_station": "Centrale",
    "m_volumes": "Volumes",
    "m_settings": "Réglages",
    "h_doors": "Capteurs de porte et de porte de garage.",
    "h_windows": "Capteurs de fenêtre ou d’ouverture.",
    "h_motion": "Capteurs de mouvement et de présence, avec le dernier mouvement.",
    "h_batteries": "Niveau de batterie des appareils de l’alarme.",
    "h_cameras": "Caméras facultatives, un appui ouvre les détails.",
    "h_siren": "Allume et éteint la sirène, avec confirmation avant l’activation.",
    "h_tamper": "Capteurs de sabotage.",
    "h_station": "Informations et état de la centrale.",
    "h_volumes": "Volume de la sirène et du clavier. Lecture seule, modifiable avec le cadenas.",
    "h_settings": "Mode d’exclusion, sons et autres choix.",
    "alarm": "Alarme",
    "u_now": "maintenant",
    "u_d": "j",
    "d_lt1": "moins d’1 min",
    "at_today": "à {t}",
    "at_yday": "hier à {t}",
    "at_date": "le {d} à {t}",
    "err_cfg": "Configuration non valide",
    "nf": "Introuvable",
    "ent_nf": "Entité introuvable",
    "na": "Indisponible",
    "ok": "OK",
    "s_open": "Ouverte",
    "s_open_since": "Ouverte depuis {s}",
    "s_closed": "Fermée",
    "s_closed_since": "Fermée · depuis {s}",
    "s_motion_on": "Mouvement en cours",
    "s_motion_off": "Aucun mouvement",
    "s_motion_last": "{m} · dernier {t}",
    "s_tamper": "Sabotage",
    "s_low": "Faible",
    "s_invalid": "Valeur non valide",
    "s_on": "Active",
    "s_off": "Éteinte",
    "sum_open_1": "{o} ouverte sur {n}",
    "sum_open_n": "{o} ouvertes sur {n}",
    "sum_na_1": "{n} indisponible",
    "sum_na_n": "{n} indisponibles",
    "sum_closed1": "Fermée",
    "sum_allclosed": "Toutes fermées",
    "sum_act_1": "{n} actif",
    "sum_act_n": "{n} actifs",
    "sum_none_m": "Aucun",
    "sum_tamper_1": "{n} sabotage",
    "sum_tamper_n": "{n} sabotages",
    "sum_none_f": "Aucun",
    "sum_low_1": "{n} faible",
    "sum_low_n": "{n} faibles",
    "sum_allok": "Toutes OK",
    "sum_cam_1": "{n} active",
    "sum_cam_n": "{n} actives",
    "sum_vols": "{n} volumes",
    "sum_sets": "{n} réglages",
    "sum_all": "Tout est OK",
    "home": "À la maison",
    "away": "Absent",
    "disarmed": "Désarmée",
    "trig": "Déclenchée",
    "arming": "Armement",
    "entry": "Entrée",
    "disarming": "Désarmement",
    "na_s": "Indispo.",
    "since_t": "depuis {t}",
    "since_ago": "depuis {s}",
    "dial_aria": "Cadran de l’alarme : {l}",
    "c_disarm": "Désarmer",
    "cmd_fail": "Commande échouée. Réessayez.",
    "cmd_fail_s": "Commande échouée.",
    "code_bad": "Code incorrect ou commande refusée.",
    "vol_fail": "Volume non modifié.",
    "sir_off_fail": "Sirène non éteinte.",
    "sir_on_fail": "Sirène non activée.",
    "set_fail": "Réglage non modifié.",
    "a_lock_vol": "Verrouiller la modification de {n}",
    "a_unlock_vol": "Déverrouiller la modification de {n}",
    "a_dec": "Diminuer {n}",
    "a_inc": "Augmenter {n}",
    "a_siren": "Sirène {n}",
    "g_ok": "Tout est OK",
    "g_att_1": "{n} en alerte",
    "g_att_n": "{n} en alerte",
    "g_allgood": "Tout est en ordre",
    "g_noalerts_l": "aucun signalement",
    "g_noalerts": "Aucun signalement",
    "close": "Fermer",
    "details": "Détails et état",
    "f_att": "Attention",
    "f_all": "Tous",
    "sir_off_q": "Éteindre la sirène ?",
    "sir_on_q": "Activer la sirène ?",
    "sir_off_p": "La sirène sera éteinte immédiatement.",
    "sir_on_p": "La sirène retentira immédiatement. Vous pourrez l’éteindre ici.",
    "cancel": "Annuler",
    "sir_off_b": "Éteindre la sirène",
    "sir_on_b": "Activer la sirène",
    "l_home": "À la maison",
    "l_away": "Absent",
    "l_off": "Désarmée",
    "l_trig": "Alarme déclenchée",
    "l_pend": "En cours",
    "l_unk": "Indisponible",
    "code": "Code",
    "now": "Maintenant",
    "after_cmd": "Après la commande",
    "code_req": "Code requis",
    "no_code": "Aucun code défini dans Home Assistant : le clavier ne vérifie rien.",
    "del_digit": "Effacer le dernier chiffre",
    "sending": "Envoi…",
    "k_disarm": "Désarmer l’alarme",
    "k_home": "Armer à la maison",
    "k_away": "Armer en absence",
    "code_note": "Le code se saisit à chaque fois et n’est jamais enregistré. Home Assistant le vérifie.",
    "empty_entity": "Choisissez l’entité d’alarme dans la configuration de la carte.",
    "empty_mods": "Aucun module avec entités : choisissez les entités dans la configuration de la carte.",
    "leg_today": "Armée aujourd’hui {d}",
    "leg_not": "Non armée",
    "leg_p": "Cadran de 12 heures : affiche maintenant {w}.",
    "w_pm": "l’après-midi (12–24)",
    "w_am": "le matin (0–12)",
    "leg_nohist": " Historique indisponible : seul l’état actuel est affiché.",
    "secs": "Sections",
    "tAl": "Alarme",
    "tMo": "Modules",
    "tAs": "Apparence",
    "al_desc": "Choisissez la centrale et l’aspect du panneau. Le code n’est jamais enregistré dans la carte : vous le saisissez à chaque fois et Home Assistant le vérifie.",
    "e_entity": "Entité d’alarme",
    "e_entity_h": "Toute entité du domaine alarm_control_panel.",
    "e_panel": "Panneau d’alarme",
    "e_panel_h": "Cadran avec les heures du jour, commandes et tuiles. Désactivé : la carte n’affiche que les modules choisis.",
    "e_cmds": "Commandes actives",
    "e_cmds_h": "Boutons À la maison, Absent et Désarmer. Désactivés : le panneau reste en lecture seule.",
    "e_leg": "Légende au toucher",
    "e_leg_h": "En touchant le cadran, les couleurs et le total du jour s’affichent.",
    "e_hands": "Aiguilles",
    "e_hands_h": "Désactivées par défaut : le point sur le bord indique déjà l’heure actuelle.",
    "mod_head": "Modules",
    "mod_desc": "Choisissez les entités de chaque module avec les sélecteurs. Un module sans entités n’apparaît pas. Chaque module fonctionne aussi seul : pour n’en avoir qu’un sur une carte, désactivez le panneau d’alarme et ne laissez actif que ce module.",
    "mv_up": "Monter {n}",
    "mv_dn": "Descendre {n}",
    "mod_on": "Module actif",
    "mod_tile": "Ligne dans la liste de la carte",
    "room_add": "Ajouter depuis une pièce",
    "room_pick": "Choisir une pièce…",
    "room_h": "Ajoute les appareils compatibles de cette pièce. Vous pouvez toujours en retirer dans le sélecteur.",
    "eyebrow": "Texte supérieur",
    "title": "Titre",
    "title_h": "Le point vert final est ajouté par la carte.",
    "show_eyebrow": "Afficher le texte supérieur",
    "show_title": "Afficher le titre",
    "full": "Toute la largeur disponible sur tablette et ordinateur",
    "full_h": "Si désactivé, la carte reste étroite (460 px) et centrée.",
    "theme": "Thème",
    "th_auto": "Automatique (Home Assistant)",
    "lang": "Langue",
    "lang_auto": "Automatique (Home Assistant)",
    "lang_h": "Automatique suit la langue de l’utilisateur dans Home Assistant. Si la langue n’est pas disponible, l’anglais est utilisé."
  }
  };
  let CUR = 'en';
  const T = (k, v) => {
    let t = TR[CUR] && TR[CUR][k];
    if (t == null) t = TR.en[k];
    if (t == null) return k;
    return v ? t.replace(/\{(\w+)\}/g, (m, x) => (v[x] != null ? v[x] : m)) : t;
  };
  const TP = (k, n, v) => T(k + (n === 1 ? '_1' : '_n'), Object.assign({ n: n }, v));
  const baseLang = (h) => {
    const l = h && ((h.locale && h.locale.language) || h.language);
    return typeof l === 'string' ? l.toLowerCase().split(/[-_]/)[0] : 'en';
  };
  const pickLang = (cfgLang, h) => {
    const l = cfgLang && cfgLang !== 'auto' ? cfgLang : baseLang(h);
    return TR[l] ? l : 'en';
  };

  /* ---------------------------------------------------------------- data */
  // Modules: every one works alone (card without the alarm panel) or together in the full card.
  const MODS = {
    doors:     { icon: 'mdi:door-closed',        sel: { filter: [{ domain: 'binary_sensor', device_class: ['door', 'garage_door', 'opening'] }] },            tile: true },
    windows:   { icon: 'mdi:window-closed-variant', sel: { filter: [{ domain: 'binary_sensor', device_class: ['window', 'opening'] }] },                         tile: true },
    motion:    { icon: 'mdi:motion-sensor',      sel: { filter: [{ domain: 'binary_sensor', device_class: ['motion', 'occupancy', 'presence'] }] },      tile: true },
    batteries: { icon: 'mdi:battery',            sel: { filter: [{ domain: 'sensor', device_class: 'battery' }, { domain: 'binary_sensor', device_class: 'battery' }] }, tile: true },
    cameras:   { icon: 'mdi:cctv',               sel: { filter: [{ domain: 'camera' }] },                                                                        tile: true },
    siren:     { icon: 'mdi:bullhorn-outline',   sel: { filter: [{ domain: 'switch' }, { domain: 'siren' }] },                                   tile: true },
    tamper:    { icon: 'mdi:shield-alert',     sel: { filter: [{ domain: 'binary_sensor', device_class: 'tamper' }] },                                          tile: false },
    station:   { icon: 'mdi:router-wireless',    sel: { filter: [{ domain: 'sensor' }, { domain: 'binary_sensor' }] },                                          tile: false },
    volumes:   { icon: 'mdi:volume-high',        sel: { filter: [{ domain: 'number' }] }, tile: false },
    settings:  { icon: 'mdi:tune',             sel: { filter: [{ domain: 'select' }] },                                                                    tile: false }
  };
  const ROOM_MODS = ['doors', 'windows', 'motion', 'batteries', 'tamper', 'cameras'];
  const MOD_ORDER = ['doors', 'windows', 'motion', 'batteries', 'cameras', 'siren', 'tamper', 'station', 'volumes', 'settings'];

  const DEFAULTS = {
    entity: '', title: null, language: 'auto', eyebrow: 'ALARM KEEPER CARD', show_eyebrow: true, show_title: true,
    panel: true, commands: true, legend: true, hands: false, width: 'center', theme_mode: 'auto'
  };

  const SHIELD = {"home": "M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z", "off": "M1,4.27L2.28,3L20.5,21.22L19.23,22.5L17,20.25C15.57,21.57 13.87,22.54 12,23C6.84,21.74 3,16.55 3,11V6.27L1,4.27M12,1L21,5V11C21,13.28 20.35,15.5 19.23,17.41L5.65,3.82L12,1Z", "away": "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.3V15.8C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z", "trig": "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5M11,7H13V13H11M11,15H13V17H11"};
  const LOW_BATTERY = 20;
  const IS_PHONE = Math.min(window.screen ? window.screen.width : 9999, window.screen ? window.screen.height : 9999) < 600;

  /* ------------------------------------------------------------- helpers */
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const ic = (name, extra) => '<ha-icon icon="' + esc(name) + '"' + (extra || '') + '></ha-icon>';
  const pad = (n) => (n < 10 ? '0' : '') + n;
  const hhmm = (d) => pad(d.getHours()) + ':' + pad(d.getMinutes());
  const agoT = (ms) => {
    const m = Math.round(ms / 60000);
    if (m < 1) return T('u_now');
    if (m < 60) return m + ' min';
    if (m < 1440) return Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + (m % 60) + ' min' : '');
    return Math.floor(m / 1440) + ' ' + T('u_d');
  };
  const durH = (h) => {
    const m = Math.round(h * 60);
    if (m < 1) return T('d_lt1');
    const H = Math.floor(m / 60), M = m % 60;
    return H ? (M ? H + ' h ' + M + ' min' : H + ' h') : M + ' min';
  };
  const midnight = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const nowH = () => (Date.now() - midnight()) / 3600000;
  const atText = (ts) => {
    const d = new Date(ts), n = new Date();
    if (d.toDateString() === n.toDateString()) return T('at_today', { t: hhmm(d) });
    const y = new Date(n.getTime() - 86400000);
    if (d.toDateString() === y.toDateString()) return T('at_yday', { t: hhmm(d) });
    let ds = pad(d.getDate()) + '/' + pad(d.getMonth() + 1);
    try { ds = d.toLocaleDateString(CUR, { day: 'numeric', month: 'short' }); } catch (e) { /* keep numeric */ }
    return T('at_date', { d: ds, t: hhmm(d) });
  };
  const isNum = (v) => v !== '' && v != null && isFinite(Number(v));

  function normalizeConfig(raw) {
    if (!raw || typeof raw !== 'object') throw new Error(T('err_cfg'));
    const c = Object.assign({}, DEFAULTS, raw);
    if (['auto', 'light', 'dark'].indexOf(c.theme_mode) < 0) c.theme_mode = 'auto';
    ['show_eyebrow', 'show_title', 'panel', 'commands', 'legend', 'hands'].forEach((k) => { c[k] = c[k] !== false && c[k] !== 'false'; });
    if (['center', 'left', 'right', 'full'].indexOf(c.width) < 0) c.width = 'center';
    c.hands = raw.hands === true;
    c.title = c.title == null ? null : String(c.title).trim().replace(/\.+$/, '');
    c.language = LANGS.some((l) => l[0] === raw.language) ? raw.language : 'auto';
    const src = raw.modules && typeof raw.modules === 'object' ? raw.modules : {};
    c.modules = {};
    MOD_ORDER.forEach((k) => {
      const m = src[k] && typeof src[k] === 'object' ? src[k] : {};
      c.modules[k] = {
        on: m.on !== false,
        entities: Array.isArray(m.entities) ? m.entities.filter((e) => typeof e === 'string' && e) : [],
        tile: typeof m.tile === 'boolean' ? m.tile : MODS[k].tile
      };
    });
    const ord = Array.isArray(raw.order) ? raw.order.filter((k) => MODS[k]) : [];
    c.order = ord.filter((k, i) => ord.indexOf(k) === i);
    MOD_ORDER.forEach((k) => { if (c.order.indexOf(k) < 0) c.order.push(k); });
    return c;
  }

  /* -------------------------------------------------------- entity logic */
  const stOf = (h, id) => (h && h.states ? h.states[id] : undefined);
  const missing = (s) => !s || s.state === 'unavailable' || s.state === 'unknown';
  // Room of an entity: its own area, otherwise the area of its device (Home Assistant registries).
  function areaOf(h, id) {
    if (!h || !h.entities) return null;
    const e = h.entities[id];
    if (!e) return null;
    let aid = e.area_id;
    if (!aid && e.device_id && h.devices && h.devices[e.device_id]) aid = h.devices[e.device_id].area_id;
    if (!aid) return null;
    const a = h.areas && h.areas[aid];
    return { id: aid, name: (a && a.name) || aid };
  }
  const nameOf = (s, id) => (s && s.attributes && s.attributes.friendly_name) || id;

  function alarmMode(state) {
    switch (state) {
      case 'disarmed': return 'off';
      case 'armed_home': case 'armed_night': return 'home';
      case 'armed_away': case 'armed_vacation': case 'armed_custom_bypass': return 'away';
      case 'triggered': return 'trig';
      case 'arming': case 'pending': case 'disarming': return 'pend';
      default: return 'unk';
    }
  }

  function fmtState(h, s) {
    if (!s) return T('nf');
    if (h && typeof h.formatEntityState === 'function') { try { return h.formatEntityState(s); } catch (e) { /* fall back */ } }
    const u = s.attributes && s.attributes.unit_of_measurement;
    return s.state + (u ? ' ' + u : '');
  }

  // One item per configured entity. lv: '' (ok) | 'warn' | 'crit'.
  function itemsOf(h, cfg, k, volPend) {
    const ids = cfg.modules[k].entities, now = Date.now();
    return ids.map((id) => {
      const s = stOf(h, id), nm = nameOf(s, id), lc = s ? Date.parse(s.last_changed) : NaN;
      const since = isFinite(lc) ? agoT(now - lc) : '';
      const it = { id: id, name: nm, lv: '', icon: MODS[k].icon, sub: '', val: '' };
      if (!s) { it.lv = 'warn'; it.sub = T('ent_nf'); return it; }
      if (s.state === 'unavailable' || s.state === 'unknown') { it.lv = 'warn'; it.sub = T('na'); it.na = true; if (k === 'cameras') it.off = true; return it; }
      const on = s.state === 'on';
      if (k === 'doors' || k === 'windows') {
        const door = k === 'doors';
        it.icon = on ? (door ? 'mdi:door-open' : 'mdi:window-open-variant') : (door ? 'mdi:door-closed' : 'mdi:window-closed-variant');
        it.open = on; it.lv = on ? 'warn' : '';
        it.sub = on ? (since ? T('s_open_since', { s: since }) : T('s_open')) : (since ? T('s_closed_since', { s: since }) : T('s_closed'));
      } else if (k === 'motion') {
        it.act = on; it.lv = on ? 'warn' : '';
        it.sub = on ? T('s_motion_on') : (isFinite(lc) ? T('s_motion_last', { m: T('s_motion_off'), t: atText(lc) }) : T('s_motion_off'));
      } else if (k === 'tamper') {
        it.tamper = on; it.lv = on ? 'crit' : ''; it.sub = on ? T('s_tamper') : T('ok');
      } else if (k === 'batteries') {
        if (s.entity_id && s.entity_id.indexOf('binary_sensor.') === 0) { it.low = on; it.lv = on ? 'warn' : ''; it.icon = on ? 'mdi:battery-alert' : 'mdi:battery'; it.sub = on ? T('s_low') : T('ok'); }
        else if (isNum(s.state)) { const p = Number(s.state); it.pct = p; it.low = p < LOW_BATTERY; it.lv = it.low ? 'warn' : ''; it.icon = it.low ? 'mdi:battery-low' : 'mdi:battery'; it.sub = Math.round(p) + '%'; }
        else { it.lv = 'warn'; it.sub = T('s_invalid'); it.na = true; }
      } else if (k === 'station') {
        it.icon = (s.attributes && s.attributes.icon) || 'mdi:router-wireless'; it.sub = fmtState(h, s);
      } else if (k === 'siren') {
        it.on = on; it.lv = on ? 'crit' : ''; it.sub = on ? T('s_on') : T('s_off');
      } else if (k === 'cameras') {
        it.pic = s.attributes && s.attributes.entity_picture; it.off = false; it.sub = T('s_on');
      } else if (k === 'volumes') {
        const a = s.attributes || {};
        let v = Number(s.state);
        if (volPend && volPend[id] != null) v = volPend[id];
        it.num = v; it.min = isNum(a.min) ? Number(a.min) : 0; it.max = isNum(a.max) ? Number(a.max) : 100; it.step = isNum(a.step) && Number(a.step) > 0 ? Number(a.step) : 1; it.unit = a.unit_of_measurement || '';
        it.val = (isNum(v) ? (Math.round(v * 100) / 100) : s.state) + (it.unit ? (it.unit === '%' ? '' : ' ') + it.unit : '');
        it.icon = 'mdi:volume-high';
        if (!isNum(v)) { it.lv = 'warn'; it.sub = T('s_invalid'); it.na = true; }
      } else if (k === 'settings') {
        const a = s.attributes || {};
        it.options = Array.isArray(a.options) ? a.options : []; it.cur = s.state; it.icon = a.icon || 'mdi:tune';
      }
      return it;
    });
  }

  function summaryOf(k, items) {
    const n = items.length, na = items.filter((i) => i.na).length;
    const naT = () => ({ lv: 'warn', t: TP('sum_na', na) });
    if (k === 'doors' || k === 'windows') {
      const o = items.filter((i) => i.open).length;
      if (o) return { lv: 'warn', t: TP('sum_open', o, { o: o, n: n }) };
      if (na) return naT();
      return { lv: 'ok', t: n === 1 ? T('sum_closed1') : T('sum_allclosed') };
    }
    if (k === 'motion') {
      const a = items.filter((i) => i.act).length;
      if (a) return { lv: 'warn', t: TP('sum_act', a) };
      if (na) return naT();
      return { lv: 'ok', t: T('sum_none_m') };
    }
    if (k === 'tamper') {
      const a = items.filter((i) => i.tamper).length;
      if (a) return { lv: 'crit', t: TP('sum_tamper', a) };
      if (na) return naT();
      return { lv: 'ok', t: T('sum_none_f') };
    }
    if (k === 'batteries') {
      const l = items.filter((i) => i.low).length;
      if (l) return { lv: 'warn', t: TP('sum_low', l) };
      if (na) return naT();
      return { lv: 'ok', t: T('sum_allok') };
    }
    if (k === 'cameras') {
      const off = items.filter((i) => i.off).length;
      if (off) return { lv: 'warn', t: TP('sum_na', off) };
      return { lv: 'ok', t: TP('sum_cam', n) };
    }
    if (k === 'siren') {
      if (items.some((i) => i.on)) return { lv: 'crit', t: T('s_on') };
      if (na) return { lv: 'warn', t: T('na') };
      return { lv: 'ok', t: T('s_off') };
    }
    if (k === 'volumes') {
      if (na) return naT();
      return { lv: 'ok', t: n === 1 ? items[0].val : T('sum_vols', { n: n }) };
    }
    if (k === 'settings') {
      if (na) return naT();
      return { lv: 'ok', t: n === 1 ? items[0].cur : T('sum_sets', { n: n }) };
    }
    if (na) return naT();
    return { lv: 'ok', t: n === 1 ? T('ok') : T('sum_all') };
  }

  /* ----------------------------------------------------------------- CSS */
  const CARD_CSS = `
:host{display:block}
*{box-sizing:border-box}
.hc{--hc-accent:#0a7156;--hc-bg:#fafbf9;--hc-tile:#f0f2ef;--hc-circle:#ffffff;--hc-line:#e0e5df;--hc-fg:#18221c;--hc-muted:#56675c;--hc-btn-fg:#0a7156;
  --hc-warn-bg:#f9f3de;--hc-warn-bd:#d3bd63;--hc-warn-fg:#5f4a10;--hc-crit-bg:#b83a42;--hc-crit-text:#ae4742;--hc-idle:#858E89;--hc-away:#246a83;
  display:block;font-family:var(--ha-font-family-body,Roboto,Arial,sans-serif);color:var(--hc-fg);font-size:var(--ha-font-size-m,14px);line-height:1.4;text-align:left}
.hc[data-mode="dark"]{--hc-accent:#0e795d;--hc-bg:#101211;--hc-tile:#191c1a;--hc-circle:#282b29;--hc-line:#2b302c;--hc-fg:#f5f7f4;--hc-muted:#bbc5bd;--hc-btn-fg:#f5f7f4;--hc-warn-bg:#302b1b;--hc-warn-bd:#816e31;--hc-warn-fg:#f1d78b;--hc-crit-text:#e85e64;--hc-idle:#8B918E}
.hc :where(button,select,input){font:inherit;color:inherit}
.hc button{cursor:pointer}
.hc ha-icon{display:flex;align-items:center;justify-content:center;line-height:0;flex:none;--mdc-icon-size:18px;width:18px;height:18px}
.cardw{container-type:inline-size;min-width:0}
.shell{position:relative;background:var(--hc-bg);border:1px solid var(--hc-line);border-radius:26px;padding:13px}
.head{margin:2px 4px 12px}.eye{font-size:11px;letter-spacing:1.5px;font-weight:750;color:var(--hc-fg);opacity:.78;margin-bottom:7px;overflow-wrap:anywhere}
.title{font-size:23px;line-height:1.14;font-weight:800;letter-spacing:-.7px;overflow-wrap:anywhere}.title b{color:var(--hc-accent)}
.panel{position:relative;background:var(--hc-tile);border:1px solid var(--hc-line);border-radius:24px;padding:8px 12px;margin-bottom:10px}
.dial{display:block;margin:0 auto 4px;max-width:186px;width:100%;height:auto}.dial.tap{cursor:pointer}
.cmds{display:flex;gap:8px;margin-top:10px}
.cmd{flex:1;min-height:42px;border-radius:999px;border:1px solid var(--hc-line);background:var(--hc-bg);font-size:13px;font-weight:600;display:flex;gap:6px;align-items:center;justify-content:center;padding:0 8px;color:var(--hc-fg)}
.cmd.p{background:var(--hc-accent);border-color:var(--hc-accent);color:#fff}
.cmd.c{background:var(--hc-crit-bg);border-color:var(--hc-crit-bg);color:#fff}
.cmd[disabled]{opacity:.5;cursor:default}
.msg{position:absolute;left:12px;right:12px;top:10px;z-index:3;box-sizing:border-box;min-height:40px;display:flex;align-items:center;justify-content:center;margin:0;padding:6px 14px;border-radius:14px;background:var(--hc-tile);border:1px solid var(--hc-crit-text);font-size:12px;color:var(--hc-crit-text);font-weight:600;text-align:center;box-shadow:0 4px 14px #0002}
.shell{position:relative}
.hc[data-loading]{pointer-events:none}.hc[data-loading] .tile .st{visibility:hidden}
.lab{margin:14px 4px 8px;color:var(--hc-muted);font-size:10px;letter-spacing:1.3px;font-weight:600;text-transform:uppercase}
.lab:first-child{margin-top:0}
.lkrow{display:flex;align-items:center;justify-content:space-between}
.lst{display:grid;grid-template-columns:minmax(0,1fr);background:var(--hc-tile);border:1px solid var(--hc-line);border-radius:20px;overflow:hidden}
.tile{display:flex;align-items:center;gap:10px;background:transparent;border:0;border-top:1px solid var(--hc-line);border-radius:0;padding:8px 12px;min-height:50px;text-align:left;width:100%;min-width:0;color:var(--hc-fg)}
.tile:first-child{border-top:0}
.tile .t{flex:1}.tile .st{flex:none;max-width:50%;margin:0;font-size:12px;text-align:right;color:var(--hc-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile.warn .st{color:var(--hc-warn-fg);font-weight:600}.tile.crit .st{color:var(--hc-crit-text);font-weight:600}
.tile .chev{color:var(--hc-muted);--mdc-icon-size:18px}
.ico{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;line-height:0;background:var(--hc-circle);flex:none;color:var(--hc-accent);--mdc-icon-size:16px}
.ico ha-icon{--mdc-icon-size:16px;width:16px;height:16px}
.warn>.ico{background:var(--hc-warn-bg);box-shadow:inset 0 0 0 1px var(--hc-warn-bd);color:var(--hc-warn-fg)}
.crit>.ico{background:var(--hc-crit-bg);color:#fff}
.t{flex:1;min-width:0}
.rn{font-size:12.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rs{font-size:10.5px;color:var(--hc-muted);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.warn .rs{color:var(--hc-warn-fg);font-weight:600}.crit .rs{color:var(--hc-crit-text);font-weight:600}
.detail{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:42px;border-radius:999px;font-weight:600;font-size:13.5px;color:var(--hc-btn-fg);border:1px solid color-mix(in srgb,var(--hc-accent) 45%,transparent);background:color-mix(in srgb,var(--hc-accent) 12%,transparent);margin-top:10px}
.leg{position:absolute;left:14px;right:14px;top:56px;background:var(--hc-bg);border:1px solid var(--hc-line);border-radius:20px;padding:14px;box-shadow:0 10px 30px #0004;z-index:2;cursor:pointer}
.leg b{display:block;font-size:15px;margin-bottom:8px}.leg .l{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--hc-muted);margin-bottom:8px}.leg .l span{display:inline-flex;align-items:center;gap:6px}.leg i{width:9px;height:9px;border-radius:50%;display:inline-block}.leg p{margin:0;font-size:11px;color:var(--hc-muted)}
.note{margin:6px 4px 12px;font-size:12px;color:var(--hc-muted)}
.empty{padding:18px 8px;text-align:center;color:var(--hc-muted);font-size:13px}
@container (min-width:600px){.panel.has-dial{display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px 28px;align-items:center;padding:16px 28px}.panel.has-dial .dial{margin:0}.panel.has-dial .cmds{margin-top:0;flex-direction:column}.panel.has-dial .cmd{min-height:52px;font-size:14.5px}.panel.has-dial .msg{grid-column:2}  .lst{grid-template-columns:repeat(2,minmax(0,1fr))}.lst .tile:nth-child(2){border-top:0}.lst .tile:nth-child(even){border-left:1px solid var(--hc-line)}.lst .tile:last-child:nth-child(odd){grid-column:1/-1}.leg{left:28px;right:auto;width:300px}}
.hc .cardw{max-width:460px;margin:0 auto}
.hc[data-cw="left"] .cardw{margin:0 auto 0 0}.hc[data-cw="right"] .cardw{margin:0 0 0 auto}.hc[data-cw="full"] .cardw{max-width:none}
.hc .head{margin-bottom:12px}.hc .title{font-size:20px}
.hc .panel.has-dial{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px 16px;align-items:center;padding:10px 14px}
.hc .panel.has-dial .dial{max-width:132px;margin:0}.hc .panel.has-dial .cmds{flex-direction:column;gap:8px;margin:0}
.hc .panel.has-dial .cmd{min-height:44px;font-size:14px;font-weight:700;padding:4px 10px}
.hc .lst{grid-template-columns:repeat(3,minmax(0,1fr))}
.hc .lst .tile{flex-direction:column;gap:3px;text-align:center;padding:8px 4px;min-height:64px;justify-content:center;border-top:0;border-left:1px solid var(--hc-line)}
.hc .lst .tile:nth-child(3n+1){border-left:0}.hc .lst .tile:nth-child(n+4){border-top:1px solid var(--hc-line)}
.hc .lst .tile:last-child:nth-child(odd){grid-column:auto}
.hc .tile .t{flex:none;font-size:11.5px}.hc .tile .st{max-width:100%;font-size:10.5px;text-align:center}.hc .tile .chev{display:none}
.hc .lst .tile.ph{pointer-events:none}
@container (max-width:599px){
.hc .cardw .lst{background:transparent;border:0;border-radius:0;overflow:visible;gap:8px;grid-template-columns:repeat(3,minmax(0,1fr))}
.hc .cardw .lst .tile{background:var(--hc-tile);border:1px solid var(--hc-line);border-radius:18px;min-height:84px;gap:6px;padding:10px 4px}
.hc .cardw .lst .tile.ph{display:none}
.hc .cardw .lst .tile.warn{border-color:var(--hc-warn-bd)}.hc .cardw .lst .tile.crit{border-color:var(--hc-crit-bg)}
.hc .cardw .lst .tile .ico{width:34px;height:34px}.hc .cardw .lst .tile .ico ha-icon{--mdc-icon-size:19px;width:19px;height:19px}
.hc .cardw .lst .tile .t{font-size:12.5px;font-weight:700}
.hc .cardw .lst .tile .st{max-width:96%;font-size:11px;font-weight:700;line-height:1.3;padding:3px 9px;border-radius:999px;background:color-mix(in srgb,var(--hc-accent) 16%,transparent);color:var(--hc-btn-fg)}
.hc .cardw .lst .tile.warn .st{background:var(--hc-warn-bg);color:var(--hc-warn-fg)}
.hc .cardw .lst .tile.crit .st{background:var(--hc-crit-bg);color:#fff}
.hc[data-loading] .cardw .lst .tile .st{background:transparent}}
.hc .detail{min-height:38px}
.head.hb{display:flex;align-items:center;justify-content:space-between;gap:10px}.head.hb .ht{min-width:0}
.hc .detail.dtl{flex:none;width:36px;min-width:36px;height:36px;min-height:36px;padding:0;gap:0;margin:0;border-radius:50%}.detail.dtl ha-icon{--mdc-icon-size:20px}
@container (min-width:600px){
.hc[data-cw="full"] .shell:has(.panel.has-dial):has(.lst){display:grid;grid-template-columns:290px minmax(0,1fr);gap:10px 12px;align-items:stretch}
.hc[data-cw="full"] .shell:has(.panel.has-dial):has(.lst)>:not(.panel):not(.lst){grid-column:1/-1}
.hc[data-cw="full"] .shell:has(.panel.has-dial):has(.lst)>.panel.has-dial{grid-column:1;display:flex;flex-direction:column;align-items:stretch;justify-content:center;gap:10px;padding:10px 12px;margin-bottom:0}
.hc[data-cw="full"] .panel.has-dial .dial{max-width:150px}.hc[data-cw="full"] .shell:has(.lst)>.panel.has-dial .dial{margin:0 auto}.hc[data-cw="full"] .panel.has-dial .cmd{min-height:46px;font-size:14px}
.hc[data-cw="full"] .shell:has(.panel.has-dial):has(.lst)>.lst{grid-column:2;grid-row:2;grid-template-columns:minmax(0,1fr)}
.hc[data-cw="full"] .lst .tile{flex-direction:row;gap:10px;text-align:left;padding:8px 12px;min-height:50px;justify-content:flex-start}
.hc[data-cw="full"] .lst .tile:nth-child(n){border-left:0;border-top:1px solid var(--hc-line)}.hc[data-cw="full"] .lst .tile:nth-child(1){border-top:0}
.hc[data-cw="full"] .lst .tile .t{flex:1;font-size:inherit}.hc[data-cw="full"] .lst .tile .st{max-width:50%;font-size:12px;text-align:right}.hc[data-cw="full"] .lst .tile .chev{display:inline-flex}
.hc[data-cw="full"] .lst .tile.ph{display:none}}
/* rows */
.row{display:flex;align-items:center;gap:10px;background:var(--hc-tile);border:1px solid var(--hc-line);border-radius:14px;padding:5px 10px;min-height:44px;margin-bottom:5px;min-width:0}
.row .rn{font-size:13px;white-space:normal;overflow:visible;text-overflow:clip;overflow-wrap:anywhere;line-height:1.25}.row .rs{font-size:11px;white-space:normal;overflow:visible;text-overflow:clip;overflow-wrap:anywhere;line-height:1.3;margin-top:1px}
.sw{width:40px;height:23px;border-radius:12px;background:var(--hc-idle);position:relative;flex:none;border:0;padding:0}.sw::after{content:"";position:absolute;top:3px;left:3px;width:17px;height:17px;border-radius:50%;background:#fff;transition:left .15s}
.sw.on{background:var(--hc-accent)}.sw.on::after{left:20px}.sw.crit.on{background:var(--hc-crit-bg)}
.lk{display:inline-flex;align-items:center;gap:5px;height:28px;padding:0 10px;border-radius:14px;border:1px solid var(--hc-line);background:var(--hc-bg);color:var(--hc-fg);font-size:11px;font-weight:600;text-transform:none;letter-spacing:0}.lk.open{background:var(--hc-accent);border-color:var(--hc-accent);color:#fff}
.lk ha-icon{--mdc-icon-size:14px;width:14px;height:14px}
.rl{flex:none;width:30px;height:30px;border-radius:50%;border:1px solid var(--hc-line);background:var(--hc-bg);color:var(--hc-muted);display:inline-flex;align-items:center;justify-content:center;padding:0;margin-left:8px}.rl.open{background:var(--hc-accent);border-color:var(--hc-accent);color:#fff}.rl ha-icon{--mdc-icon-size:15px;width:15px;height:15px}
.vv{font-size:13px;min-width:38px;text-align:right;font-weight:700}
.stp{display:flex;align-items:center;gap:8px}.stp button{width:32px;height:32px;border-radius:50%;border:1px solid var(--hc-line);background:var(--hc-bg);font-size:18px;line-height:1;color:var(--hc-fg);padding:0}.stp button[disabled]{opacity:.4}.stp strong{min-width:44px;text-align:center;font-size:13px}
.sp{appearance:none;border:1px solid var(--hc-line);background:var(--hc-bg);border-radius:999px;padding:7px 12px;font-size:12.5px;font-weight:600;width:132px;max-width:50%;flex:none;text-align:center;text-align-last:center;color:var(--hc-fg)}
.cams{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-bottom:6px}
.cam{position:relative;aspect-ratio:16/10;border-radius:16px;border:1px solid var(--hc-line);overflow:hidden;display:grid;place-items:center;color:#ffffffb0;text-align:left;padding:0;background:linear-gradient(135deg,#34424b,#1b252b)}
.cams .cam:last-child:nth-child(odd){grid-column:1/-1;aspect-ratio:16/5}
.cam img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.cam .n{position:absolute;left:8px;bottom:6px;right:8px;font-size:11.5px;font-weight:600;color:#fff;text-shadow:0 1px 3px #000a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cam .lv{position:absolute;right:8px;top:7px;font-size:9px;font-weight:700;letter-spacing:.8px;color:#fff;display:flex;align-items:center;gap:4px;text-shadow:0 1px 3px #000a}.cam .lv i{width:6px;height:6px;border-radius:50%;background:#4bd8a2}.cam .lv.off i{background:#e85e64}
.cam ha-icon{--mdc-icon-size:30px;width:30px;height:30px}
/* popup */
.ov{position:fixed;inset:0;margin:0;width:100%;height:100%;max-width:none;max-height:none;border:0;z-index:9999;overscroll-behavior:contain;overflow:hidden;color:inherit;background:#0009;align-items:center;justify-content:center;padding:max(16px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(16px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left))}
.ov:not([open]){display:none}.ov[open]{display:flex}.ov::backdrop{background:transparent}
.dlg{width:min(390px,100%);max-width:100%;min-width:0;align-self:center;height:min(calc(100vh - 40px),680px);height:min(calc(100dvh - 40px),680px);display:flex;flex-direction:column;background:var(--hc-bg);color:var(--hc-fg);border:1px solid var(--hc-line);border-radius:26px;overflow:hidden;box-shadow:0 18px 60px #0005}
:host([data-popup="wide"]) .dlg{width:min(1120px,100%);height:min(80vh,560px);height:min(80dvh,560px)}
.dlg.small,:host([data-popup="wide"]) .dlg.small{width:min(390px,100%);height:auto;max-height:min(calc(100vh - 32px),680px);max-height:min(calc(100dvh - 32px),680px)}
.dlg.small .mb{flex:0 1 auto}
.mh{flex:none;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 16px 12px 18px;background:var(--hc-bg);border-bottom:1px solid var(--hc-line)}
.mt{flex:1;min-width:0;margin:0;font-size:17px;font-weight:600;line-height:1.3}
.x{display:grid;place-items:center;line-height:0;margin:0;padding:0;width:40px;height:40px;flex:none;border:1px solid var(--hc-line);border-radius:50%;background:var(--hc-tile);color:var(--hc-fg)}
.mb{flex:1 1 auto;min-height:0;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;padding:12px 18px 18px;min-width:0}
:host([data-popup="wide"]) .mb{padding:12px 22px 22px}
.chips{display:flex;gap:6px;margin-bottom:4px}
*,*::before,*::after{-webkit-tap-highlight-color:transparent}button:focus:not(:focus-visible),[tabindex]:focus:not(:focus-visible),dialog:focus,svg:focus{outline:none;box-shadow:none}
.chip{min-height:36px;padding:0 14px;border:1px solid var(--hc-line);border-radius:999px;background:var(--hc-tile);color:var(--hc-muted);font-size:13px}
.chip[aria-pressed="true"]{background:color-mix(in srgb,var(--hc-accent) 14%,transparent);border-color:color-mix(in srgb,var(--hc-accent) 45%,transparent);color:var(--hc-fg);font-weight:600}
.rh{display:flex;justify-content:space-between;align-items:center;gap:10px;margin:16px 0 8px;font-size:13px;font-weight:600}.rh span{font-size:11px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;color:var(--hc-muted)}
.rh em{font-style:normal;font-size:11px;font-weight:600;padding:3px 9px;border-radius:10px}.rh em.w{color:var(--hc-warn-fg);background:var(--hc-warn-bg,#f7ecc8)}.rh em.o{color:var(--hc-accent);background:color-mix(in srgb,var(--hc-accent) 14%,transparent)}.rh em.c{color:var(--hc-crit-text);background:color-mix(in srgb,var(--hc-crit-text) 14%,transparent)}
.mrow{display:flex;flex-direction:row-reverse;gap:22px;align-items:flex-start}.mcol{flex:1 1 0;min-width:0}
:host([data-popup="wide"]) .chips{margin-bottom:4px}
.mcol>.grp:first-child .rh,.cols>.grp:first-child .rh{margin-top:4px}
.abig{display:flex;align-items:center;gap:12px;margin:4px 0 12px;padding:14px;border-radius:24px;background:var(--hc-tile);border:1px solid var(--hc-line)}
.orb{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:var(--hc-accent);color:#fff;flex:none}
.orb svg{width:24px;height:24px}
.vt{font-size:17px;font-weight:700;letter-spacing:-.3px}.vs{font-size:11.5px;color:var(--hc-muted);margin-top:2px}
.ast{display:flex;gap:8px;margin-bottom:14px}.ast>div{flex:1;padding:10px 12px;border-radius:16px;background:var(--hc-tile);border:1px solid var(--hc-line)}.ast span{display:block;font-size:11px;color:var(--hc-muted)}.ast b{display:block;margin-top:3px;font-size:13px}
.lbl{margin:0 4px 8px;color:var(--hc-muted);font-size:10px;letter-spacing:1.3px;font-weight:600;text-transform:uppercase;text-align:center}
.warnt{margin:0 0 12px;padding:9px 12px;border-radius:14px;background:var(--hc-warn-bg);border:1px solid var(--hc-warn-bd);color:var(--hc-warn-fg);font-size:12px;text-align:center}
.dotrow{display:flex;justify-content:center;align-items:center;min-height:28px;margin-bottom:4px}
.dots{display:flex;gap:12px;justify-content:center;min-height:14px}.dots i{width:12px;height:12px;border-radius:50%;border:1.5px solid var(--hc-muted)}.dots i.f{background:var(--hc-fg);border-color:var(--hc-fg)}
.err{text-align:center;color:var(--hc-crit-text);font-size:12.5px;font-weight:600;min-height:18px;margin:2px 0 6px}
.keys{display:grid;grid-template-columns:repeat(3,72px);gap:10px;justify-content:center;margin:4px 0 14px}
.keys button{width:72px;height:56px;border-radius:18px;border:1px solid var(--hc-line);background:var(--hc-tile);padding:0;display:flex;align-items:center;justify-content:center;line-height:1;color:var(--hc-fg);-webkit-tap-highlight-color:transparent}
.keys button:active{background:var(--hc-line)}
.keys b{font-size:24px;font-weight:500;letter-spacing:0}
.keys .bk{border-color:transparent;background:transparent}.keys .bk ha-icon{--mdc-icon-size:26px;width:26px;height:26px}.keys .bk[disabled]{opacity:.35;cursor:default}
@media (max-height:720px){.keys button{height:48px}.keys{gap:8px 10px}.keys b{font-size:22px}}
.code{display:block;width:100%;min-height:46px;margin:0 0 12px;padding:0 14px;border-radius:14px;border:1px solid var(--hc-line);background:var(--hc-tile);color:var(--hc-fg);font-size:16px}
.acta{display:block;width:100%;min-height:46px;border-radius:999px;background:var(--hc-accent);color:#fff;border:0;font-size:14px;font-weight:600}.acta[disabled]{opacity:.45;cursor:default}
.acta.c{background:var(--hc-crit-bg)}
.cf{padding:22px 18px 18px;text-align:center}.cf .wi{width:48px;height:48px;border-radius:50%;margin:0 auto 12px;display:grid;place-items:center;background:var(--hc-warn-bg);box-shadow:inset 0 0 0 2px var(--hc-warn-bd);color:var(--hc-warn-fg)}.cf .wi ha-icon{--mdc-icon-size:24px;width:24px;height:24px}
.cf h3{margin:0 0 6px;font-size:18px}.cf p{margin:0 0 16px;color:var(--hc-muted);font-size:13px}.cf .cmds{margin-top:0}
.shake{animation:sh .35s}@keyframes sh{20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
`;

  /* ------------------------------------------------------------ the card */
  class AlarmKeeperCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = '<style>' + CARD_CSS + '</style><div id="r"></div>';
      this._root = this.shadowRoot.getElementById('r');
      this._cfg = null; this._hass = null; this._sig = null;
      this._popup = false; this._view = 'list'; this._filter = 'v'; this._focusMod = null; this._ret = '';
      this._code = ''; this._err = ''; this._busy = false; this._act = ''; this._shake = false; this._sirenId = '';
      this._leg = false; this._vunl = {}; this._volPend = {}; this._msg = ''; this._focus = '';
      this._segs = null; this._histOk = false; this._histAt = 0; this._histBusy = false; this._histKey = '';
      this._onKey = (e) => this._key(e);
      this._onResize = () => { this._applyLayout(); if (this._popup) this._render(); };
      this._timer = null;
      this.shadowRoot.addEventListener('click', (e) => this._click(e));
      this.shadowRoot.addEventListener('change', (e) => this._change(e));
    }

    static getStubConfig(hass) {
      const c = {};
      const ids = hass && hass.states ? Object.keys(hass.states).filter((i) => i.indexOf('alarm_control_panel.') === 0) : [];
      if (ids.length) c.entity = ids[0];
      return c;
    }
    static getConfigElement() { return document.createElement(EDITOR_TAG); }
    getCardSize() { return 6; }
    getGridOptions() { return { columns: 12, min_columns: 6 }; }

    setConfig(config) {
      this._cfg = normalizeConfig(config);
      this._sig = null; this._histKey = '';
      this._render();
    }
    set hass(h) {
      this._hass = h;
      if (!this._cfg) return;
      this._maybeHistory();
      const sig = this._signature();
      if (sig === this._sig) return;
      this._sig = sig;
      this._render();
    }
    get hass() { return this._hass; }

    connectedCallback() {
      window.addEventListener('resize', this._onResize);
      this._applyLayout();
      this._timer = window.setInterval(() => {
        if (this._cfg && this._hass && !this._popup) { this._maybeHistory(); this._render(); }
      }, 60000);
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      document.removeEventListener('keydown', this._onKey, true);
      if (this._timer) window.clearInterval(this._timer);
    }

    _applyLayout() {
      const wide = !IS_PHONE && window.matchMedia('(min-width:640px) and (min-height:600px)').matches;
      this.setAttribute('data-popup', wide ? 'wide' : 'phone');
    }
    _sl() { CUR = pickLang(this._cfg && this._cfg.language, this._hass); return CUR; }
    _wide() { return this.getAttribute('data-popup') === 'wide'; }
    _colCount() {
      if (!this._wide()) return 1;
      const w = Math.min(1120, window.innerWidth - 32) - 44;
      return Math.max(1, Math.min(4, Math.floor((w + 22) / 282)));
    }

    _mode() {
      const m = this._cfg.theme_mode;
      if (m === 'light' || m === 'dark') return m;
      return this._hass && this._hass.themes && this._hass.themes.darkMode ? 'dark' : 'light';
    }

    _signature() {
      const h = this._hass, c = this._cfg;
      const parts = [h && h.themes && h.themes.darkMode ? 'd' : 'l', pickLang(c.language, h), JSON.stringify(this._vunl), JSON.stringify(this._volPend)];
      if (c.entity) { const s = stOf(h, c.entity); parts.push('A:' + (s ? s.state + ':' + s.last_changed + ':' + (s.attributes && s.attributes.code_format) : '-')); }
      MOD_ORDER.forEach((k) => {
        const m = c.modules[k];
        if (!m.on) return;
        m.entities.forEach((id) => {
          const s = stOf(h, id);
          parts.push(id + ':' + (s ? s.state + (k === 'cameras' ? ':' + (s.attributes && s.attributes.entity_picture) : '') + (s.attributes && s.attributes.options ? ':' + s.attributes.options.length : '') : '-'));
        });
      });
      return parts.join('|');
    }

    /* ---- history of the day for the clock ---- */
    _maybeHistory() {
      const c = this._cfg, h = this._hass;
      if (!c || !h || !c.panel || !c.entity || this._histBusy) return;
      const s = stOf(h, c.entity);
      const key = c.entity + '|' + (s ? s.state : '-') + '|' + new Date().toDateString();
      if (key === this._histKey && Date.now() - this._histAt < 300000) return;
      this._histBusy = true; this._histKey = key; this._histAt = Date.now();
      const m0 = midnight();
      const fallback = () => {
        const st = stOf(this._hass, c.entity);
        const lc = st ? Date.parse(st.last_changed) : NaN;
        this._segs = st && isFinite(lc) ? [{ a: Math.max(0, (lc - m0) / 3600000), b: null, m: alarmMode(st.state) }] : [];
        this._histOk = false;
      };
      const done = () => { this._histBusy = false; this._sig = null; this._render(); };
      try {
        Promise.resolve(h.callWS({ type: 'history/history_during_period', start_time: new Date(m0).toISOString(), end_time: new Date().toISOString(), entity_ids: [c.entity], minimal_response: true, no_attributes: true, significant_changes_only: false })).then((r) => {
          const arr = r && (r[c.entity] || (Array.isArray(r) ? r[0] : null));
          if (!Array.isArray(arr) || !arr.length) { fallback(); done(); return; }
          const pts = [];
          arr.forEach((e) => {
            const state = e.s != null ? e.s : e.state;
            let ts = e.lc != null ? e.lc : (e.lu != null ? e.lu : null);
            ts = ts != null ? ts * 1000 : Date.parse(e.last_changed || e.last_updated);
            if (state == null || !isFinite(ts)) return;
            pts.push({ t: Math.max(ts, m0), m: alarmMode(state) });
          });
          pts.sort((x, y) => x.t - y.t);
          if (!pts.length) { fallback(); done(); return; }
          this._segs = pts.map((p, i) => ({ a: (p.t - m0) / 3600000, b: i < pts.length - 1 ? (pts[i + 1].t - m0) / 3600000 : null, m: p.m }));
          this._histOk = true; done();
        }, () => { fallback(); done(); });
      } catch (err) { fallback(); this._histBusy = false; }
    }

    _segments() {
      const n = nowH();
      let segs = this._segs;
      if (!segs) {
        const st = stOf(this._hass, this._cfg.entity), lc = st ? Date.parse(st.last_changed) : NaN;
        segs = st && isFinite(lc) ? [{ a: Math.max(0, (lc - midnight()) / 3600000), b: null, m: alarmMode(st.state) }] : [];
      }
      return segs.map((s) => ({ a: s.a, b: s.b == null ? n : s.b, m: s.m }));
    }

    /* ---- the clock ---- */
    _dial(mode, st) {
      const cx = 100, cy = 100, r = 84, n = nowH(), half = n >= 12 ? 1 : 0, h0 = half * 12, cfg = this._cfg;
      const meta = {
        home: { p: SHIELD.home, l: T('home'), o: 'var(--hc-accent)', f: '#fff' },
        away: { p: SHIELD.away, l: T('away'), o: 'var(--hc-away)', f: '#fff' },
        off: { p: SHIELD.off, l: T('disarmed'), o: 'var(--hc-warn-bg)', f: 'var(--hc-warn-fg)', ring: 'var(--hc-warn-bd)' },
        trig: { p: SHIELD.trig, l: T('trig'), o: 'var(--hc-crit-bg)', f: '#fff' },
        pend: { p: SHIELD.off, l: st && st.state === 'arming' ? T('arming') : st && st.state === 'pending' ? T('entry') : T('disarming'), o: 'var(--hc-warn-bg)', f: 'var(--hc-warn-fg)', ring: 'var(--hc-warn-bd)' },
        unk: { p: SHIELD.off, l: T('na_s'), o: 'var(--hc-warn-bg)', f: 'var(--hc-warn-fg)', ring: 'var(--hc-warn-bd)' }
      };
      const M = meta[mode], lc = st ? Date.parse(st.last_changed) : NaN;
      const sub = !isFinite(lc) ? '' : (mode === 'home' || mode === 'away') ? T('since_t', { t: hhmm(new Date(lc)) }) : mode === 'unk' ? '' : T('since_ago', { s: agoT(Date.now() - lc) });
      const P = (rr, p) => { const a = (p / 12 * 360 - 90) * Math.PI / 180; return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)]; };
      const arc = (p0, p1, col) => {
        const A = P(r, p0), B = P(r, p1);
        return '<path d="M' + A[0].toFixed(1) + ' ' + A[1].toFixed(1) + 'A' + r + ' ' + r + ' 0 ' + ((p1 - p0) > 6 ? 1 : 0) + ' 1 ' + B[0].toFixed(1) + ' ' + B[1].toFixed(1) + '" fill="none" stroke="' + col + '" stroke-width="10"/>';
      };
      let a = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="var(--hc-line)" stroke-width="10"/>';
      const col = { home: 'var(--hc-accent)', away: 'var(--hc-away)', off: 'var(--hc-warn-bd)', trig: 'var(--hc-crit-bg)' };
      this._segments().forEach((s) => {
        if (!col[s.m]) return;
        const A = Math.max(s.a, h0), B = Math.min(s.b, h0 + 12);
        if (B - A > 0.005) a += arc(A - h0, B - h0, col[s.m]);
      });
      const np = P(r, n - h0);
      a += mode === 'trig'
        ? '<circle cx="' + np[0] + '" cy="' + np[1] + '" r="7" fill="var(--hc-crit-bg)" stroke="var(--hc-tile)" stroke-width="3"/>'
        : '<circle cx="' + np[0] + '" cy="' + np[1] + '" r="5.5" fill="var(--hc-tile)" stroke="var(--hc-fg)" stroke-width="2"/>';
      for (let i = 0; i < 12; i++) {
        if (i % 3 === 0) continue;
        const p0 = P(r - 11, i), p1 = P(r - 16, i);
        a += '<line x1="' + p0[0] + '" y1="' + p0[1] + '" x2="' + p1[0] + '" y2="' + p1[1] + '" stroke="var(--hc-muted)" stroke-width="1.5" stroke-linecap="round" opacity=".6"/>';
      }
      [['12', 0], ['3', 3], ['6', 6], ['9', 9]].forEach((l) => {
        const p = P(r - 23, l[1]);
        a += '<text x="' + p[0] + '" y="' + (p[1] + 5) + '" text-anchor="middle" font-size="' + (cfg.hands ? 14 : 16) + '" font-weight="700" fill="var(--hc-fg)" font-family="Roboto,Arial,sans-serif">' + l[0] + '</text>';
      });
      if (cfg.hands) {
        const hh = P(32, n % 12), mm = P(46, ((n % 1) * 60) / 5);
        a += '<line x1="' + cx + '" y1="' + cy + '" x2="' + hh[0] + '" y2="' + hh[1] + '" stroke="var(--hc-fg)" stroke-width="4" stroke-linecap="round" opacity=".85"/><line x1="' + cx + '" y1="' + cy + '" x2="' + mm[0] + '" y2="' + mm[1] + '" stroke="var(--hc-fg)" stroke-width="2.5" stroke-linecap="round" opacity=".85"/><circle cx="' + cx + '" cy="' + cy + '" r="5" fill="var(--hc-fg)"/>';
      }
      const hd = cfg.hands, ry = hd ? 108 : 54, rh = hd ? 48 : 92, ir = hd ? 8 : 13, cr = hd ? 8 : 14, iy = hd ? 121 : 76, ly = hd ? 140 : 114, sy = hd ? 151 : 136;
      const ks = ir * 2 * 0.65 / 24, lsz = hd ? 12 : M.l.length > 11 ? 14 : 16;
      a += '<rect x="' + (hd ? 46 : 44) + '" y="' + ry + '" width="' + (hd ? 108 : 112) + '" height="' + rh + '" rx="16" fill="var(--hc-tile)" opacity=".94"/><circle cx="' + cx + '" cy="' + iy + '" r="' + cr + '" fill="' + M.o + '"' + (M.ring ? ' stroke="' + M.ring + '" stroke-width="1.5"' : '') + '/>' +
        '<g transform="translate(' + (cx - 12 * ks).toFixed(2) + ',' + (iy - 12 * ks).toFixed(2) + ') scale(' + ks.toFixed(3) + ')" fill="' + M.f + '"><path d="' + M.p + '"/></g>' +
        '<text x="' + cx + '" y="' + (sub ? ly : ly + 4) + '" text-anchor="middle" font-size="' + lsz + '" font-weight="700" fill="var(--hc-fg)" font-family="Roboto,Arial,sans-serif">' + M.l + '</text>' +
        (sub ? '<text x="' + cx + '" y="' + sy + '" text-anchor="middle" font-size="' + (hd ? 9.5 : 13) + '" fill="var(--hc-muted)" font-family="Roboto,Arial,sans-serif">' + esc(sub) + '</text>' : '');
      return '<svg class="dial' + (cfg.legend ? ' tap' : '') + '" ' + (cfg.legend ? 'data-act="leg" role="button" tabindex="0" ' : 'role="img" ') + 'aria-label="' + esc(T('dial_aria', { l: M.l })) + '" width="200" height="200" viewBox="0 0 200 200">' + a + '</svg>';
    }

    _armedTotal() {
      const n = nowH();
      return this._segments().reduce((t, s) => t + ((s.m === 'home' || s.m === 'away') ? Math.max(0, Math.min(s.b, n) - s.a) : 0), 0);
    }

    /* ---- commands ---- */
    _cmds(mode, st) {
      const b = (cls, icon, label, act) => '<button type="button" class="cmd ' + cls + '" data-act="' + act + '" data-focus="' + act + '">' + ic(icon) + label + '</button>';
      if (mode === 'home') return b('p', 'mdi:shield-off', T('c_disarm'), 'disarm') + b('', 'mdi:shield-lock', T('away'), 'arm_away');
      if (mode === 'away') return b('p', 'mdi:shield-off', T('c_disarm'), 'disarm') + b('', 'mdi:shield-home', T('home'), 'arm_home');
      if (mode === 'trig') return b('c', 'mdi:shield-off', T('c_disarm'), 'disarm');
      if (mode === 'off') return b('p', 'mdi:shield-home', T('home'), 'arm_home') + b('', 'mdi:shield-lock', T('away'), 'arm_away');
      if (mode === 'pend') return b('p', 'mdi:shield-off', T('c_disarm'), 'disarm');
      return '';
    }

    _needsCode(st) { return !!(st && st.attributes && st.attributes.code_format); }

    _arm(act) {
      const st = stOf(this._hass, this._cfg.entity);
      if (!st) return;
      const needArm = !!(st.attributes && st.attributes.code_arm_required && this._needsCode(st));
      if (needArm) { this._openKeypad(act); return; }
      this._call('alarm_control_panel', 'alarm_' + act, { entity_id: this._cfg.entity }, T('cmd_fail'));
    }
    _call(domain, service, data, failMsg) {
      const fm = failMsg || T('cmd_fail_s');
      try {
        Promise.resolve(this._hass.callService(domain, service, data)).then(() => { /* state arrives through hass */ }, () => { this._flash(fm); });
      } catch (e) { this._flash(fm); }
    }
    _flash(t) {
      this._msg = t; this._render();
      window.clearTimeout(this._msgT);
      this._msgT = window.setTimeout(() => { this._msg = ''; this._render(); }, 5000);
    }

    _openKeypad(act) {
      this._ret = act === 'disarm' ? 'disarm' : act;
      this._view = 'keypad'; this._act = act; this._code = ''; this._err = ''; this._busy = false;
      this._popup = true; this._focus = 'close';
      document.addEventListener('keydown', this._onKey, true);
      this._render();
    }
    _submit() {
      const st = stOf(this._hass, this._cfg.entity);
      if (this._busy || !st) return;
      const need = this._needsCode(st);
      if (need && !this._code) return;
      this._busy = true; this._err = ''; this._render();
      const data = { entity_id: this._cfg.entity };
      if (this._code) data.code = this._code;
      const act = this._act;
      const fin = (ok) => {
        this._busy = false;
        if (ok) { this._code = ''; this._closePopup(); return; }
        this._sl(); this._err = T('code_bad'); this._code = ''; this._shake = true; this._focus = 'close'; this._render(); this._shake = false;
      };
      try { Promise.resolve(this._hass.callService('alarm_control_panel', 'alarm_' + act, data)).then(() => fin(true), () => fin(false)); } catch (e) { fin(false); }
    }

    _openDetails(mod) {
      const issues = this._allIssues();
      this._view = 'details'; this._filter = issues ? 'v' : 'a'; this._focusMod = mod || null; this._gv = mod ? 'type' : 'room';
      if (mod) this._filter = 'a';
      this._ret = mod ? 'tile-' + mod : 'details'; this._popup = true; this._focus = 'close';
      document.addEventListener('keydown', this._onKey, true);
      this._render();
    }
    _openSiren(id) {
      this._view = 'siren'; this._sirenId = id; this._ret = 'tile-siren'; this._popup = true; this._focus = 'close';
      document.addEventListener('keydown', this._onKey, true);
      this._render();
    }
    _closePopup(silent) {
      if (!this._popup) return;
      this._popup = false; this._view = 'list'; this._code = ''; this._err = ''; this._busy = false; this._focusMod = null;
      document.removeEventListener('keydown', this._onKey, true);
      this._focus = silent ? '' : this._ret; this._render();
    }

    _mods() { return this._cfg.order.filter((k) => this._cfg.modules[k].on && this._cfg.modules[k].entities.length); }
    _items(k) { return itemsOf(this._hass, this._cfg, k, this._volPend); }
    _allIssues() {
      return this._mods().reduce((n, k) => n + this._items(k).filter((i) => i.lv).length, 0);
    }

    /* ---- markup ---- */
    _row(it, extra) {
      return '<div class="row ' + it.lv + '"><div class="ico">' + ic(it.icon) + '</div><div class="t"><div class="rn">' + esc(it.name) + '</div>' + (it.sub ? '<div class="rs">' + esc(it.sub) + '</div>' : '') + '</div>' + (extra || '') + '</div>';
    }
    _section(k) { return this._itemsHTML(k, this._items(k)); }
    _itemsHTML(k, items) {
      if (k === 'cameras') {
        return '<div class="cams">' + items.map((it) => '<button type="button" class="cam" data-act="cam" data-id="' + esc(it.id) + '" aria-label="' + esc(it.name) + '">' + (it.pic && !it.off ? '<img src="' + esc(it.pic) + '" alt="" loading="lazy">' : ic('mdi:cctv')) + '<span class="lv ' + (it.off ? 'off' : '') + '"><i></i>' + (it.off ? 'OFFLINE' : 'LIVE') + '</span><span class="n">' + esc(it.name) + '</span></button>').join('') + '</div>';
      }
      return items.map((it) => {
        if (k === 'siren') return this._row(it, '<button type="button" class="sw crit ' + (it.on ? 'on' : '') + '" data-act="siren" data-id="' + esc(it.id) + '" aria-label="' + esc(T('a_siren', { n: it.name })) + '" ' + (it.na ? 'disabled' : '') + '></button>');
        if (k === 'volumes') {
          if (it.na) return this._row(it);
          const unl = !!this._vunl[it.id];
          const lkb = '<button type="button" class="rl ' + (unl ? 'open' : '') + '" data-act="vlock" data-id="' + esc(it.id) + '" data-focus="vl-' + esc(it.id) + '" aria-label="' + esc(T(unl ? 'a_lock_vol' : 'a_unlock_vol', { n: it.name })) + '">' + ic(unl ? 'mdi:lock-open-variant' : 'mdi:lock') + '</button>';
          if (!unl) return this._row(Object.assign({}, it, { sub: '' }), '<strong class="vv">' + esc(it.val) + '</strong>' + lkb);
          const dl = Math.max(it.step, Math.round(((it.max - it.min) / 10) / it.step) * it.step);
          return this._row(Object.assign({}, it, { sub: '' }), '<div class="stp"><button type="button" data-act="vol" data-focus="vm-' + esc(it.id) + '" data-id="' + esc(it.id) + '" data-d="' + (-dl) + '" aria-label="' + esc(T('a_dec', { n: it.name })) + '" ' + (it.num <= it.min ? 'disabled' : '') + '>−</button><strong>' + esc(it.val) + '</strong><button type="button" data-act="vol" data-focus="vp-' + esc(it.id) + '" data-id="' + esc(it.id) + '" data-d="' + dl + '" aria-label="' + esc(T('a_inc', { n: it.name })) + '" ' + (it.num >= it.max ? 'disabled' : '') + '>+</button></div>' + lkb);
        }
        if (k === 'settings') {
          if (it.na || !it.options.length) return this._row(Object.assign({}, it, { sub: it.na ? it.sub : it.cur }));
          return this._row(Object.assign({}, it, { sub: '' }), '<select class="sp" data-sel="' + esc(it.id) + '" aria-label="' + esc(it.name) + '">' + it.options.map((o) => '<option value="' + esc(o) + '" ' + (o === it.cur ? 'selected' : '') + '>' + esc(o) + '</option>').join('') + '</select>');
        }
        return this._row(it);
      }).join('');
    }

    _hasRooms() {
      return this._mods().some((k) => this._items(k).some((it) => areaOf(this._hass, it.id)));
    }
    _groupsHTML(filter) {
      const mods = this._mods();
      let b = '';
      const none = () => '<div class="grp"><div class="rh"><span>' + esc(T('g_allgood')) + '</span><em class="o">' + esc(T('g_noalerts_l')) + '</em></div>' + this._row({ lv: '', icon: 'mdi:check', name: T('g_noalerts'), sub: T('ok') }) + '</div>';
      if (this._gv === 'room' && this._hasRooms()) {
        const bk = {};
        mods.forEach((k) => this._items(k).forEach((it) => {
          if (filter === 'v' && !it.lv) return;
          const a = areaOf(this._hass, it.id), key = a ? a.id : '';
          (bk[key] = bk[key] || { name: a ? a.name : '', mods: {} }).mods[k] = (bk[key].mods[k] || []).concat([it]);
        }));
        const keys = Object.keys(bk).filter((x) => x !== '').sort((x, y) => bk[x].name.localeCompare(bk[y].name, CUR));
        if (!keys.length && !bk['']) return none();
        const grp = (title, g, lock, first) => {
          const ord = mods.filter((k) => g.mods[k]).sort((x, y) => (x === first ? -1 : 0) - (y === first ? -1 : 0)), all = [].concat.apply([], ord.map((k) => g.mods[k])), bad = all.filter((i) => i.lv);
          return '<div class="grp"><div class="rh"><span>' + esc(title) + '</span>' + '' + '<em class="' + (bad.some((i) => i.lv === 'crit') ? 'c' : bad.length ? 'w' : 'o') + '">' + (bad.length ? TP('g_att', bad.length) : T('g_ok')) + '</em></div>' +
            ord.map((k) => filter === 'v' ? g.mods[k].map((i) => this._row(i)).join('') : this._itemsHTML(k, g.mods[k])).join('') + '</div>';
        };
        keys.forEach((key) => { b += grp(bk[key].name, bk[key], !!bk[key].mods.volumes && filter !== 'v'); });
        // Devices without a room are not a room: they follow. Battery, tamper, volumes and settings that
        // belong to the same Home Assistant device as the siren (or the base station) are listed under it.
        if (bk['']) {
          const free = bk[''].mods, ent = this._hass.entities || {}, devOf = (id) => (ent[id] && ent[id].device_id) || '';
          const dev = { siren: {}, station: {} };
          ['siren', 'station'].forEach((an) => { if (mods.indexOf(an) >= 0) this._cfg.modules[an].entities.forEach((id) => { if (devOf(id)) dev[an][devOf(id)] = 1; }); });
          const sub = { siren: {}, station: {} }, rest = {};
          Object.keys(free).forEach((m) => free[m].forEach((it) => {
            const d = devOf(it.id), an = ['batteries', 'tamper', 'volumes', 'settings'].indexOf(m) >= 0 && d ? (dev.siren[d] ? 'siren' : dev.station[d] ? 'station' : '') : '';
            if (an) sub[an][m] = (sub[an][m] || []).concat([it]); else rest[m] = (rest[m] || []).concat([it]);
          }));
          mods.forEach((k) => {
            const g = { mods: {} };
            if (rest[k]) g.mods[k] = rest[k];
            if (sub[k]) Object.keys(sub[k]).forEach((m) => { g.mods[m] = sub[k][m]; });
            if (Object.keys(g.mods).length) b += grp(T('m_' + k), g, !!g.mods.volumes && filter !== 'v', k);
          });
        }
        return b;
      }
      if (filter === 'v') {
        let any = false;
        mods.forEach((k) => {
          const L = this._items(k).filter((i) => i.lv);
          if (!L.length) return;
          any = true;
          b += '<div class="grp"><div class="rh"><span>' + esc(T('m_' + k)) + '</span><em class="' + (L.some((i) => i.lv === 'crit') ? 'c' : 'w') + '">' + TP('g_att', L.length) + '</em></div>' + L.map((i) => this._row(i)).join('') + '</div>';
        });
        return any ? b : none();
      }
      mods.forEach((k) => {
        const s = summaryOf(k, this._items(k));
        b += '<div class="grp" data-mod="' + k + '"><div class="rh"><span>' + esc(T('m_' + k)) + '</span>' + '<em class="' + (s.lv === 'ok' ? 'o' : s.lv === 'crit' ? 'c' : 'w') + '">' + esc(s.t) + '</em></div>' + this._section(k) + '</div>';
      });
      return b;
    }

    _popupHTML() {
      const x = '<button type="button" class="x" data-act="close" data-focus="close" aria-label="' + esc(T('close')) + '">' + ic('mdi:close') + '</button>';
      const st = stOf(this._hass, this._cfg.entity);
      if (this._view === 'details') {
        const chips = '<div class="chips"><button type="button" class="chip" data-filter="v" aria-pressed="' + (this._filter === 'v') + '" data-focus="fv">' + esc(T('f_att')) + '</button><button type="button" class="chip" data-filter="a" aria-pressed="' + (this._filter === 'a') + '" data-focus="fa">' + esc(T('f_all')) + '</button></div>';
        return '<dialog class="ov" data-act="ovclose" aria-label="' + esc(T('details')) + '"><div class="dlg"><div class="mh"><h2 class="mt">' + esc(T('details')) + '</h2>' + x + '</div><div class="mb"><div class="cols">' + chips + this._groupsHTML(this._filter) + '</div></div></div></dialog>';
      }
      if (this._view === 'siren') {
        const so = !!this._sirenOff;
        return '<dialog class="ov" data-act="ovclose" aria-label="' + esc(T(so ? 'sir_off_q' : 'sir_on_q').replace(/\s*\?$/, '')) + '"><div class="dlg small"><div class="cf"><div class="wi">' + ic('mdi:bullhorn-outline') + '</div><h3>' + esc(T(so ? 'sir_off_q' : 'sir_on_q')) + '</h3><p>' + esc(T(so ? 'sir_off_p' : 'sir_on_p')) + '</p><div class="cmds"><button type="button" class="cmd" data-act="close" data-focus="close">' + esc(T('cancel')) + '</button><button type="button" class="cmd ' + (so ? 'p' : 'c') + '" data-act="siren-yes" data-focus="yes">' + esc(T(so ? 'sir_off_b' : 'sir_on_b')) + '</button></div></div></div></dialog>';
      }
      // keypad
      const mode = alarmMode(st ? st.state : ''), need = this._needsCode(st), text = st && st.attributes && st.attributes.code_format === 'text';
      const lab = { home: T('l_home'), away: T('l_away'), off: T('l_off'), trig: T('l_trig'), pend: T('l_pend'), unk: T('l_unk') }[mode];
      const after = { disarm: T('l_off'), arm_home: T('l_home'), arm_away: T('l_away') }[this._act];
      const orbBg = mode === 'trig' ? 'var(--hc-crit-bg)' : mode === 'away' ? 'var(--hc-away)' : mode === 'off' || mode === 'pend' || mode === 'unk' ? 'var(--hc-warn-bg)' : 'var(--hc-accent)';
      const orbFg = mode === 'off' || mode === 'pend' || mode === 'unk' ? 'var(--hc-warn-fg)' : '#fff';
      const sh = SHIELD[mode === 'unk' || mode === 'pend' ? 'off' : mode];
      const dots = Math.max(4, this._code.length);
      const sz = this._wide() ? ' small' : '';
      let input;
      if (text) input = '<input class="code" type="password" id="code" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="' + esc(T('code')) + '" value="' + esc(this._code) + '" data-focus="code">';
      else input = '<div class="dotrow"><div class="dots ' + (this._shake ? 'shake' : '') + '" id="dots">' + Array.from({ length: dots }, (_, i) => '<i class="' + (i < this._code.length ? 'f' : '') + '"></i>').join('') + '</div></div>';
      const kb = (k) => '<button type="button" data-act="key" data-k="' + k + '" aria-label="' + k + '"><b>' + k + '</b></button>';
      const keys = text ? '' : '<div class="keys">' + [1, 2, 3, 4, 5, 6, 7, 8, 9].map(kb).join('') + '<span></span>' + kb(0) + '<button type="button" class="bk" data-act="back" aria-label="' + esc(T('del_digit')) + '" ' + (this._code ? '' : 'disabled') + '>' + ic('mdi:backspace-outline') + '</button></div>';
      const label = this._act === 'disarm' ? T('k_disarm') : this._act === 'arm_home' ? T('k_home') : T('k_away');
      return '<dialog class="ov" data-act="ovclose" aria-label="' + esc(T('alarm')) + '"><div class="dlg' + sz + '"><div class="mh"><h2 class="mt">' + esc(T('alarm')) + '</h2>' + x + '</div><div class="mb">' +
        '<div class="abig"><div class="orb" style="background:' + orbBg + ';color:' + orbFg + '"><svg viewBox="0 0 24 24"><path fill="currentColor" d="' + sh + '"/></svg></div><div><div class="vt">' + lab + '</div><div class="vs">' + esc(this._cfg.title || T('alarm')) + '</div></div></div>' +
        '<div class="ast"><div><span>' + esc(T('now')) + '</span><b>' + lab + '</b></div><div><span>' + esc(T('after_cmd')) + '</span><b>' + after + '</b></div></div>' +
        (need ? '<div class="lbl">' + esc(T('code_req')) + '</div>' : '<div class="warnt">' + esc(T('no_code')) + '</div>') +
        input + '<div class="err" id="err" role="alert">' + esc(this._err) + '</div>' + keys +
        '<button type="button" class="acta' + (this._act === 'disarm' && mode === 'trig' ? ' c' : '') + '" data-act="submit" data-focus="submit" ' + ((need && !this._code) || this._busy ? 'disabled' : '') + '>' + (this._busy ? T('sending') : esc(label)) + '</button>' +
        '<div class="note" style="text-align:center;margin-top:10px">' + esc(T('code_note')) + '</div></div></div></dialog>';
    }

    _render() {
      if (!this._cfg) return;
      this._sl();
      const root = this._root, cfg = this._cfg, hass = this._hass;
      const body0 = root.querySelector('.mb'), keep = body0 ? body0.scrollTop : 0;
      const active = this.shadowRoot.activeElement;
      const want = this._focus || (active && active.getAttribute ? active.getAttribute('data-focus') : '');
      const typed = active && active.id === 'code' ? { v: active.value, s: active.selectionStart } : null;
      this._focus = '';
      // Until Home Assistant hands over its state the card is drawn with the real structure (empty data),
      // so it already has its final height and nothing moves when the data arrives.
      if (!hass) {
        this._hass = { states: {}, areas: {}, devices: {}, entities: {}, themes: {}, callService: () => Promise.reject(new Error('loading')) };
        try { this._render(); } finally { this._hass = null; }
        const hc = root.querySelector('.hc'); if (hc) hc.setAttribute('data-loading', '');
        return;
      }
      const h0 = root.getBoundingClientRect().height; if (h0) root.style.minHeight = h0 + 'px';
      const mods = this._mods();
      let h = '<div class="shell">' + (this._msg ? '<div class="msg" role="alert">' + esc(this._msg) + '</div>' : '');
      const ttl = cfg.title == null ? T('alarm') : cfg.title;
      const hasHead = (cfg.show_title && ttl) || (cfg.show_eyebrow && cfg.eyebrow);
      const dtlInHead = !!(hasHead && cfg.panel && mods.length);
      if (hasHead) {
        const ht = (cfg.show_eyebrow && cfg.eyebrow ? '<div class="eye">' + esc(cfg.eyebrow) + '</div>' : '') + (cfg.show_title && ttl ? '<div class="title" role="heading" aria-level="2">' + esc(ttl) + '<b>.</b></div>' : '');
        h += dtlInHead ? '<div class="head hb"><div class="ht">' + ht + '</div><button type="button" class="detail dtl" data-act="details" data-focus="details" aria-label="' + esc(T('details')) + '" title="' + esc(T('details')) + '">' + ic('mdi:chevron-right') + '</button></div>' : '<div class="head">' + ht + '</div>';
      }
      if (cfg.panel) {
        const st = cfg.entity ? stOf(hass, cfg.entity) : null;
        if (!cfg.entity) h += '<div class="panel"><div class="empty">' + esc(T('empty_entity')) + '</div></div>';
        else {
          const mode = alarmMode(st ? st.state : '');
          h += '<div class="panel has-dial">' + this._dial(mode, st) + (cfg.commands ? '<div class="cmds">' + this._cmds(mode, st) + '</div>' : '') + '';
          if (this._leg && cfg.legend) {
            const n = nowH();
            h += '<div class="leg" data-act="leg"><b>' + esc(T('leg_today', { d: durH(this._armedTotal()) })) + '</b><div class="l"><span><i style="background:var(--hc-accent)"></i>' + esc(T('home')) + '</span><span><i style="background:var(--hc-away)"></i>' + esc(T('away')) + '</span><span><i style="background:var(--hc-warn-bd)"></i>' + esc(T('leg_not')) + '</span></div><p>' + esc(T('leg_p', { w: T(n >= 12 ? 'w_pm' : 'w_am') })) + (this._histOk ? '' : esc(T('leg_nohist'))) + '</p></div>';
          }
          h += '</div>';
        }
        const tiles = mods.filter((k) => cfg.modules[k].tile);
        if (tiles.length) {
          h += '<div class="lst">' + tiles.map((k) => {
            const s = summaryOf(k, this._items(k));
            return '<button type="button" class="tile ' + (s.lv === 'ok' ? '' : s.lv) + '" data-act="' + (k === 'siren' ? 'siren-tile' : 'tile') + '" data-m="' + k + '" data-focus="tile-' + k + '"><div class="ico">' + ic(MODS[k].icon) + '</div><div class="t"><div class="rn">' + esc(T('m_' + k)) + '</div></div><div class="rs st">' + esc(s.t) + '</div>' + ic('mdi:chevron-right', ' class="chev"') + '</button>';
          }).join('') + new Array((3 - (tiles.length % 3)) % 3 + 1).join('<span class="tile ph" aria-hidden="true"></span>') + '</div>';
        }
        if (mods.length && !dtlInHead) h += '<button type="button" class="detail" data-act="details" data-focus="details">' + esc(T('details')) + ' ' + ic('mdi:chevron-right') + '</button>';
      } else {
        if (!mods.length) h += '<div class="empty">' + esc(T('empty_mods')) + '</div>';
        mods.forEach((k) => {
          h += (mods.length > 1 ? '<div class="lab">' + esc(T('m_' + k)) + '</div>' : '') + this._section(k);
        });
      }
      h += '</div>';
      root.innerHTML = '<div class="hc" data-mode="' + this._mode() + '"' + ' data-cw="' + cfg.width + '"' + '><div class="cardw">' + h + '</div>' + (this._popup ? this._popupHTML() : '') + '</div>';
      const modal = root.querySelector('dialog.ov');
      if (modal) {
        modal.addEventListener('cancel', (ev) => ev.preventDefault());
        // Top layer: the popup is centred on the screen whatever the dashboard around the card does.
        try { if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', ''); } catch (err) { modal.setAttribute('open', ''); }
      }
      this._masonry();
      const nb = root.querySelector('.mb');
      if (nb) {
        nb.scrollTop = keep;
        if (this._focusMod) {
          const g = nb.querySelector('[data-mod="' + this._focusMod + '"]');
          if (g) nb.scrollTop = Math.max(0, nb.scrollTop + g.getBoundingClientRect().top - nb.getBoundingClientRect().top - 6);
          this._focusMod = null;
        }
      }
      if (this._popup) this._lockScroll();
      if (h0) window.requestAnimationFrame(() => { root.style.minHeight = ''; });
      if (typed) { const el = root.querySelector('#code'); if (el) { el.focus({ preventScroll: true }); try { el.setSelectionRange(typed.s, typed.s); } catch (e) { /* ignore */ } } }
      else if (want) { const el = root.querySelector('[data-focus="' + want + '"]'); if (el) el.focus({ preventScroll: true }); }
    }

    // Whole groups (never split) go into columns filled from the right towards the left; the assignment
    // that leaves the columns most even is chosen, so the wide popup has no empty gaps.
    _masonry() {
      if (!this._popup || this._view !== 'details') return;
      const c = this._root.querySelector('.cols');
      if (!c) return;
      const n = this._colCount();
      if (n < 2) return;
      const gs = [].slice.call(c.querySelectorAll(':scope > .grp'));
      if (!gs.length) return;
      const gap = 22, cw = Math.floor((c.clientWidth - gap * (n - 1)) / n);
      gs.forEach((g) => { g.style.width = cw + 'px'; });
      const hs = gs.map((g) => g.offsetHeight + 16);
      gs.forEach((g) => { g.style.width = ''; });
      const m = gs.length, asg = new Array(m).fill(0);
      let best = null, bestA = null, count = 0;
      const rec = (i, used, H) => {
        if (count > 300000) return;
        if (i === m) {
          count++;
          const mx = Math.max.apply(null, H), sq = H.reduce((a, h) => a + h * h, 0);
          if (!best || mx < best[0] || (mx === best[0] && sq < best[1])) { best = [mx, sq]; bestA = asg.slice(); }
          return;
        }
        for (let k = 0; k <= Math.min(used, n - 1); k++) {
          asg[i] = k; H[k] += hs[i];
          rec(i + 1, Math.max(used, k + 1), H);
          H[k] -= hs[i];
        }
      };
      rec(0, 0, new Array(n).fill(0));
      if (!bestA) { // too many groups for an exhaustive search: shortest column first
        const H = new Array(n).fill(0);
        bestA = gs.map((g, i) => { let k = 0; for (let x = 1; x < n; x++) if (H[x] < H[k]) k = x; H[k] += hs[i]; return k; });
      }
      const row = document.createElement('div');
      row.className = 'mrow';
      const cols = [];
      for (let i = 0; i < n; i++) { const d = document.createElement('div'); d.className = 'mcol'; row.appendChild(d); cols.push(d); }
      gs.forEach((g, i) => { cols[bestA[i]].appendChild(g); });
      c.appendChild(row);
    }

    // While the popup is open the dashboard behind must not move.
    _lockScroll() {
      const overlay = this._root.querySelector('.ov');
      if (!overlay) return;
      const body = overlay.querySelector('.mb');
      const atEdge = (dy) => !body || (dy < 0 && body.scrollTop <= 0) || (dy > 0 && body.scrollTop + body.clientHeight >= body.scrollHeight - 1);
      overlay.addEventListener('wheel', (e) => { if (!body || !body.contains(e.target) || atEdge(e.deltaY)) e.preventDefault(); }, { passive: false });
      let y = 0;
      overlay.addEventListener('touchstart', (e) => { const t = e.touches[0]; y = t ? t.clientY : 0; }, { passive: true });
      overlay.addEventListener('touchmove', (e) => { const t = e.touches[0], dy = y - (t ? t.clientY : y); if (!body || !body.contains(e.target) || atEdge(dy)) e.preventDefault(); }, { passive: false });
    }

    _click(e) {
      const t = e.target.closest ? e.target.closest('[data-act],[data-filter]') : null;
      if (!t) return;
      this._sl();
      if (t.dataset.filter) { this._filter = t.dataset.filter; this._focus = t.dataset.focus || ''; this._render(); return; }
      const a = t.dataset.act, hass = this._hass;
      if (a === 'ovclose') { if (e.target === t) this._closePopup(); return; }
      if (a === 'close') { this._closePopup(); return; }
      if (a === 'leg') { this._leg = !this._leg; this._render(); return; }
      if (a === 'details') { this._openDetails(); return; }
      if (a === 'tile') { this._openDetails(t.dataset.m); return; }
      if (a === 'disarm') { this._openKeypad('disarm'); return; }
      if (a === 'arm_home' || a === 'arm_away') { this._arm(a); return; }
      if (a === 'key') { if (this._code.length < 12 && !this._busy) { this._code += t.dataset.k; this._err = ''; this._focus = ''; this._render(); } return; }
      if (a === 'back') { this._code = this._code.slice(0, -1); this._err = ''; this._render(); return; }
      if (a === 'submit') { this._submit(); return; }
      if (a === 'vlock') { const vid = t.dataset.id; this._vunl[vid] = !this._vunl[vid]; this._focus = 'vl-' + vid; this._sig = null; this._render(); return; }
      if (a === 'vol') {
        const id = t.dataset.id, s = stOf(hass, id); if (!s) return;
        const at = s.attributes || {}, mn = isNum(at.min) ? Number(at.min) : 0, mx = isNum(at.max) ? Number(at.max) : 100;
        const base = this._volPend[id] != null ? this._volPend[id] : Number(s.state);
        if (!isNum(base)) return;
        const v = Math.max(mn, Math.min(mx, Math.round((base + Number(t.dataset.d)) * 1000) / 1000));
        this._volPend[id] = v; this._sig = null; this._focus = t.dataset.focus || '';
        window.setTimeout(() => { if (this._volPend[id] === v) { delete this._volPend[id]; this._sig = null; if (this._popup || this._cfg) this._render(); } }, 4000);
        this._call('number', 'set_value', { entity_id: id, value: v }, T('vol_fail'));
        this._render(); return;
      }
      if (a === 'siren-tile' || a === 'siren') {
        const id = t.dataset.id || (this._cfg.modules.siren.entities.find((i) => { const s = stOf(hass, i); return s && s.state === 'on'; }) || this._cfg.modules.siren.entities[0]);
        const s = stOf(hass, id); if (!s || missing(s)) return;
        this._sirenOff = s.state === 'on';
        this._openSiren(id);
        return;
      }
      if (a === 'siren-yes') { const id = this._sirenId, off = this._sirenOff; this._closePopup(true); this._call(id.split('.')[0], off ? 'turn_off' : 'turn_on', { entity_id: id }, off ? T('sir_off_fail') : T('sir_on_fail')); return; }
      if (a === 'cam') { const id = t.dataset.id; if (this._popup) this._closePopup(true); this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: id }, bubbles: true, composed: true })); }
    }
    _change(e) {
      const el = e.target;
      this._sl();
      if (el && el.dataset && el.dataset.sel) this._call('select', 'select_option', { entity_id: el.dataset.sel, option: el.value }, T('set_fail'));
      if (el && el.id === 'code') { this._code = el.value; this._err = ''; }
    }
    _key(e) {
      if (!this._popup) return;
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); this._closePopup(); return; }
      if (this._view === 'keypad') {
        const st = stOf(this._hass, this._cfg.entity), text = st && st.attributes && st.attributes.code_format === 'text';
        const inInput = this.shadowRoot.activeElement && this.shadowRoot.activeElement.id === 'code';
        if (inInput) {
          if (e.key === 'Enter') { e.preventDefault(); this._code = this.shadowRoot.activeElement.value; this._submit(); return; }
        } else if (!text) {
          if (/^[0-9]$/.test(e.key)) { e.preventDefault(); if (this._code.length < 12 && !this._busy) { this._code += e.key; this._err = ''; this._render(); } return; }
          if (e.key === 'Backspace') { e.preventDefault(); this._code = this._code.slice(0, -1); this._render(); return; }
          if (e.key === 'Enter') { e.preventDefault(); this._submit(); return; }
        }
      }
      if (e.key === 'Tab') {
        const dlg = this._root.querySelector('.dlg'); if (!dlg) return;
        const f = [].slice.call(dlg.querySelectorAll('button:not([disabled]),input,select')); if (!f.length) return;
        const first = f[0], last = f[f.length - 1], act = this.shadowRoot.activeElement;
        if (e.shiftKey && act === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && act === last) { e.preventDefault(); first.focus(); }
        else if (!dlg.contains(act)) { e.preventDefault(); first.focus(); }
      }
    }
  }

  /* ----------------------------------------------------------- the editor */
  const EDITOR_CSS = `
:host{display:block;color:var(--primary-text-color,#19221E);font-family:var(--ha-font-family-body,Roboto,Arial,sans-serif)}
*{box-sizing:border-box}
.ed{font-size:14px}
button,input,select{font:inherit;color:inherit}
.tabs{display:flex;gap:5px;overflow-x:auto;padding-bottom:14px;border-bottom:1px solid var(--divider-color,#E1E5E1)}
.tab{border:0;background:none;color:var(--secondary-text-color,#68716C);border-radius:13px;padding:10px 13px;white-space:nowrap;cursor:pointer}
.tab[aria-pressed="true"]{color:var(--primary-text-color,#19221E);background:var(--secondary-background-color,#F1F3EF);font-weight:650}
.heading{font-size:21px;font-weight:500;margin:25px 0 9px}
.desc{color:var(--secondary-text-color,#68716C);font-size:13px;line-height:1.5;margin-bottom:20px}
.field{display:block;margin:18px 0}
.label{font-size:14px;margin-bottom:10px}
.input{display:block;width:100%;background:var(--secondary-background-color,#F1F3EF);color:var(--primary-text-color,#19221E);border:0;border-bottom:1px solid var(--divider-color,#E1E5E1);padding:14px 13px;min-height:50px;border-radius:11px 11px 0 0}
.row{border-bottom:1px solid var(--divider-color,#E1E5E1);padding:13px 0;display:flex;align-items:center;justify-content:space-between;gap:15px}
.row label{flex:1;min-width:0}
.row input[type=checkbox]{width:18px;height:18px;accent-color:var(--primary-color,#064E3B);flex:none}
.muted{font-size:12px;line-height:1.5;color:var(--secondary-text-color,#68716C)}
.tiny{font-size:11px;color:var(--secondary-text-color,#68716C);margin:9px 0}
.action{background:var(--secondary-background-color,#F1F3EF);border:1px solid var(--divider-color,#E1E5E1);color:var(--primary-text-color,#19221E);padding:5px 9px;min-width:34px;border-radius:10px;cursor:pointer}
.action:disabled{opacity:.45;cursor:not-allowed}
.mod{border-bottom:1px solid var(--divider-color,#E1E5E1);padding:16px 0}
.mh{display:flex;align-items:center;gap:10px}
.mh .nm{flex:1;min-width:0;font-weight:600;font-size:15px}
.ctl{display:flex;gap:6px;flex:none}
.mb{margin-top:10px}
.chk{display:flex;align-items:center;gap:10px;margin:8px 0;font-size:13px}
.chk input{width:18px;height:18px;accent-color:var(--primary-color,#064E3B)}
`;

  class AlarmKeeperCardEditor extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._config = {}; this._hass = null; this._tab = 'allarme'; this._last = ''; this._built = false;
      this.shadowRoot.addEventListener('click', (e) => this._click(e));
      this.shadowRoot.addEventListener('change', (e) => this._change(e));
      this.shadowRoot.addEventListener('input', (e) => this._input(e));
    }
    setConfig(config) {
      const j = JSON.stringify(config || {});
      if (this._built && j === this._last) return;
      this._config = clone(config || {}); this._last = j; this._render();
    }
    set hass(h) {
      const first = !this._hass; this._hass = h;
      if (first && this._built) this._render();
      else this.shadowRoot.querySelectorAll('ha-selector').forEach((s) => { s.hass = h; });
    }
    get hass() { return this._hass; }

    _emit(cfg) {
      this._config = cfg; this._last = JSON.stringify(cfg);
      this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: cfg }, bubbles: true, composed: true }));
    }
    _norm() { try { return normalizeConfig(this._config); } catch (e) { return normalizeConfig({}); } }
    _set(key, value) { const c = clone(this._config); if (value === undefined || value === '') delete c[key]; else c[key] = value; this._emit(c); }
    _setMod(k, patch) {
      const n = this._norm(), c = clone(this._config);
      c.modules = c.modules || {};
      c.modules[k] = Object.assign({}, n.modules[k], patch);
      c.order = n.order;
      this._emit(c);
    }

    _field(label, inner, help) { return '<div class="field"><div class="label">' + esc(label) + '</div>' + inner + (help ? '<div class="tiny">' + esc(help) + '</div>' : '') + '</div>'; }
    _check(id, label, help, on) { return '<div class="row"><label for="' + id + '">' + esc(label) + (help ? '<div class="muted">' + esc(help) + '</div>' : '') + '</label><input type="checkbox" id="' + id + '" ' + (on ? 'checked' : '') + '></div>'; }

    _allarme(n) {
      return '<div class="heading">' + esc(T('tAl')) + '</div><div class="desc">' + esc(T('al_desc')) + '</div>' +
        this._field(T('e_entity'), '<div data-slot="entity"></div>', T('e_entity_h')) +
        this._check('panel', T('e_panel'), T('e_panel_h'), n.panel) +
        this._check('commands', T('e_cmds'), T('e_cmds_h'), n.commands) +
        this._check('legend', T('e_leg'), T('e_leg_h'), n.legend) +
        this._check('hands', T('e_hands'), T('e_hands_h'), n.hands);
    }
    _moduli(n) {
      let h = '<div class="heading">' + esc(T('mod_head')) + '</div><div class="desc">' + esc(T('mod_desc')) + '</div>';
      n.order.forEach((k, i) => {
        const m = n.modules[k];
        h += '<div class="mod"><div class="mh"><div class="nm">' + esc(T('m_' + k)) + '</div><div class="ctl"><button type="button" class="action" data-move="' + i + ':-1" aria-label="' + esc(T('mv_up', { n: T('m_' + k) })) + '" ' + (i === 0 ? 'disabled' : '') + '>↑</button><button type="button" class="action" data-move="' + i + ':1" aria-label="' + esc(T('mv_dn', { n: T('m_' + k) })) + '" ' + (i === n.order.length - 1 ? 'disabled' : '') + '>↓</button></div></div>' +
          '<div class="muted" style="margin-top:6px">' + esc(T('h_' + k)) + '</div>' +
          '<div class="mb"><div class="chk"><input type="checkbox" id="on-' + k + '" data-on="' + k + '" ' + (m.on ? 'checked' : '') + '><label for="on-' + k + '">' + esc(T('mod_on')) + '</label></div>' +
          (n.panel ? '<div class="chk"><input type="checkbox" id="tile-' + k + '" data-tile="' + k + '" ' + (m.tile ? 'checked' : '') + '><label for="tile-' + k + '">' + esc(T('mod_tile')) + '</label></div>' : '') +
          '<div data-slot="mod-' + k + '"></div>' + this._roomPick(k, m) + '</div></div>';
      });
      return h;
    }
    // Rooms (Home Assistant areas) that hold compatible devices not yet in the module.
    _roomsFor(k, m) {
      const h = this._hass, f = MODS[k].sel && MODS[k].sel.filter;
      if (!h || !h.states || !h.areas || ROOM_MODS.indexOf(k) < 0 || !f) return [];
      const out = {};
      Object.keys(h.states).forEach((id) => {
        if (m.entities.indexOf(id) >= 0) return;
        const st = h.states[id], dc = st && st.attributes && st.attributes.device_class;
        const ok = f.some((x) => x.domain === id.split('.')[0] && (!x.device_class || [].concat(x.device_class).indexOf(dc) >= 0));
        if (!ok) return;
        const a = areaOf(h, id);
        if (a) (out[a.id] = out[a.id] || { id: a.id, name: a.name, ids: [] }).ids.push(id);
      });
      return Object.keys(out).map((x) => out[x]).sort((x, y) => x.name.localeCompare(y.name, CUR));
    }
    _roomPick(k, m) {
      const rs = this._roomsFor(k, m);
      if (!rs.length) return '';
      return '<div class="field"><div class="label">' + esc(T('room_add')) + '</div><select class="input" data-room="' + k + '"><option value="">' + esc(T('room_pick')) + '</option>' + rs.map((r) => '<option value="' + esc(r.id) + '">' + esc(r.name) + ' (' + r.ids.length + ')</option>').join('') + '</select><div class="tiny">' + esc(T('room_h')) + '</div></div>';
    }
    _aspetto(n) {
      return '<div class="heading">' + esc(T('tAs')) + '</div>' +
        this._field(T('eyebrow'), '<input class="input" type="text" id="eyebrow" maxlength="60" value="' + esc(n.eyebrow) + '">') +
        this._field(T('title'), '<input class="input" type="text" id="title" maxlength="60" value="' + esc(n.title == null ? T('alarm') : n.title) + '">', T('title_h')) +
        this._check('show-eyebrow', T('show_eyebrow'), '', n.show_eyebrow) +
        this._check('show-title', T('show_title'), '', n.show_title) +
        this._check('cw', T('full'), T('full_h'), n.width === 'full') +
        this._field(T('theme'), '<select class="input" id="theme">' + [['auto', T('th_auto')], ['light', 'Light Edera'], ['dark', 'Dark Edera']].map((o) => '<option value="' + o[0] + '" ' + (n.theme_mode === o[0] ? 'selected' : '') + '>' + esc(o[1]) + '</option>').join('') + '</select>') +
        this._field(T('lang'), '<select class="input" id="language">' + [['auto', T('lang_auto')]].concat(LANGS).map((o) => '<option value="' + o[0] + '" ' + (n.language === o[0] ? 'selected' : '') + '>' + esc(o[1]) + '</option>').join('') + '</select>', T('lang_h'));
    }
    _mount(slot, selector, value, cb) {
      const el = document.createElement('ha-selector');
      el.hass = this._hass; el.selector = selector; el.value = value; el.required = false;
      el.addEventListener('value-changed', (ev) => { ev.stopPropagation(); cb(ev.detail ? ev.detail.value : undefined); });
      slot.appendChild(el);
    }
    _render() {
      const n = this._norm(), t = this._tab;
      CUR = pickLang(n.language, this._hass);
      const act = this.shadowRoot.activeElement ? this.shadowRoot.activeElement.id : '';
      this.shadowRoot.innerHTML = '<style>' + EDITOR_CSS + '</style><div class="ed"><div class="tabs" role="group" aria-label="' + esc(T('secs')) + '">' +
        [['allarme', T('tAl')], ['moduli', T('tMo')], ['aspetto', T('tAs')]].map((a) => '<button type="button" class="tab" data-tab="' + a[0] + '" id="t-' + a[0] + '" aria-pressed="' + (t === a[0]) + '">' + a[1] + '</button>').join('') + '</div>' +
        (t === 'allarme' ? this._allarme(n) : t === 'moduli' ? this._moduli(n) : this._aspetto(n)) + '</div>';
      this._built = true;
      const sl = (name) => this.shadowRoot.querySelector('[data-slot="' + name + '"]');
      if (sl('entity')) this._mount(sl('entity'), { entity: { domain: 'alarm_control_panel' } }, n.entity || undefined, (v) => this._set('entity', v || undefined));
      MOD_ORDER.forEach((k) => {
        const s = sl('mod-' + k);
        if (s) this._mount(s, { entity: Object.assign({ multiple: true }, MODS[k].sel) }, n.modules[k].entities, (v) => this._setMod(k, { entities: Array.isArray(v) ? v : [] }));
      });
      if (act) { const el = this.shadowRoot.getElementById(act); if (el && !el.disabled) el.focus({ preventScroll: true }); }
    }
    _click(e) {
      let t = e.target.closest('[data-tab]'); if (t) { this._tab = t.dataset.tab; this._render(); return; }
      t = e.target.closest('[data-move]');
      if (t) {
        const a = t.dataset.move.split(':').map(Number), i = a[0], j = i + a[1], n = this._norm();
        if (j < 0 || j >= n.order.length) return;
        const o = n.order.slice(), tmp = o[i]; o[i] = o[j]; o[j] = tmp;
        const c = clone(this._config); c.order = o; this._emit(c); this._render();
      }
    }
    _change(e) {
      const el = e.target, c = clone(this._config);
      if (el.dataset && el.dataset.on) { this._setMod(el.dataset.on, { on: el.checked }); return; }
      if (el.dataset && el.dataset.tile) { this._setMod(el.dataset.tile, { tile: el.checked }); return; }
      const map = { 'show-eyebrow': 'show_eyebrow', 'show-title': 'show_title', panel: 'panel', commands: 'commands', legend: 'legend', hands: 'hands' };
      if (map[el.id]) { c[map[el.id]] = el.checked; this._emit(c); if (el.id === 'panel') this._render(); return; }
      if (el.id === 'cw') { c.width = el.checked ? 'full' : 'center'; this._emit(c); return; }
      if (el.id === 'theme') { c.theme_mode = el.value; this._emit(c); return; }
      if (el.id === 'language') { if (el.value === 'auto') delete c.language; else c.language = el.value; this._emit(c); this._render(); return; }
      if (el.dataset && el.dataset.room && el.value) {
        const k = el.dataset.room, n = this._norm(), r = this._roomsFor(k, n.modules[k]).filter((x) => x.id === el.value)[0];
        if (r) { this._setMod(k, { entities: n.modules[k].entities.concat(r.ids) }); this._render(); }
      }
    }
    _input(e) {
      const el = e.target;
      if (el.id === 'eyebrow') this._set('eyebrow', el.value);
      else if (el.id === 'title') this._set('title', el.value);
    }
  }

  if (!customElements.get(TAG)) customElements.define(TAG, AlarmKeeperCard);
  if (!customElements.get(EDITOR_TAG)) customElements.define(EDITOR_TAG, AlarmKeeperCardEditor);
  window.customCards = window.customCards || [];
  if (!window.customCards.some((c) => c.type === TAG)) {
    window.customCards.push({ type: TAG, name: 'Alarm Keeper Card', description: 'Modular alarm card: 12-hour activity clock, code-protected disarming, siren confirmation and optional sensors, cameras, volumes and settings.', preview: true });
  }
  // eslint-disable-next-line no-console
  console.info('%c ALARM-KEEPER-CARD %c ' + VERSION + ' ', 'color:#fff;background:#0a7156;font-weight:700', 'color:#0a7156;background:#fff');
})();
