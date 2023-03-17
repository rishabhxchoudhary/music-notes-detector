import librosa
import matplotlib.pyplot as plt
import numpy as np
import math
import io

def freq_to_note(freq):
    if freq==0:
        return None,None
    """
    Returns the note and octave corresponding to a given frequency.
    """
    notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
#         notes = ["Sa", "Sa#", "Re", "Re#", "Ga", "Ma", "Ma#", "Pa", "Pa#", "Dha", "Dha#", "Ni"]
    A4_freq = 440.0
    A4_note = 9
    A4_octave = 4
    half_steps = round(12 * math.log2(freq / A4_freq))
    note = notes[(A4_note + half_steps) % 12]
    octave = A4_octave + ((A4_note + half_steps) // 12)
    return note,octave

def getNotes(times,max_freqs):
    final = {}
    prev = "C"
    prev_octave=0
    for i in range(len(times)):
        note,octave = freq_to_note(max_freqs[i])
        if note==None: continue
        if note==prev: continue
#         if prev_octave!=0 and abs(prev_octave-octave)>=2: continue
        final[str(int(times[i]*1000))] = prev+str(prev_octave)
        prev = note
        prev_octave = octave
    return final



def get_music_notes(audio_file):
    audio_file = io.BytesIO(audio_file)
    y,sr = librosa.load(audio_file,sr=None)
    D = librosa.stft(y)
    S_db = librosa.amplitude_to_db(abs(D), ref=np.max)
    times = librosa.frames_to_time(np.arange(S_db.shape[1]), sr=sr)
    n_fft = 8192
    freqs = librosa.fft_frequencies(sr=sr,n_fft=n_fft)
    max_freq_index = np.argmax(S_db, axis=0)
    max_freqs = freqs[max_freq_index]
    notes = getNotes(times,max_freqs)
    return notes