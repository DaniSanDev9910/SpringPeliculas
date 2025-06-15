import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Square,
  ArrowLeft,
  Volume2,
  VolumeX
} from 'lucide-react';

export function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Función para manejar el progreso del video
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  // Funciones de control del video
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const percentageClicked = (clickPosition / progressBar.offsetWidth) * 100;
    
    if (videoRef.current) {
      const newTime = (percentageClicked / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="text-white hover:text-amber-500 transition-colors flex items-center gap-2"
        >
          <ArrowLeft />
          <span>Volver</span>
        </button>
      </div>

      {/* Video Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
        <div className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // URL de ejemplo
          />
          
          {/* Progress Bar */}
          <div 
            className="absolute bottom-16 left-0 right-0 mx-4 h-1 bg-slate-700 cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-amber-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={handleBackward}
                className="text-white hover:text-amber-500 transition-colors p-2"
                title="Retroceder 10 segundos"
              >
                <SkipBack className="w-6 h-6" />
              </button>

              <button 
                onClick={togglePlay}
                className="text-white hover:text-amber-500 transition-colors p-2"
                title={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
              </button>

              <button 
                onClick={handleStop}
                className="text-white hover:text-amber-500 transition-colors p-2"
                title="Detener"
              >
                <Square className="w-6 h-6" />
              </button>

              <button 
                onClick={handleForward}
                className="text-white hover:text-amber-500 transition-colors p-2"
                title="Adelantar 10 segundos"
              >
                <SkipForward className="w-6 h-6" />
              </button>

              <button 
                onClick={toggleMute}
                className="text-white hover:text-amber-500 transition-colors p-2 ml-4"
                title={isMuted ? "Activar sonido" : "Silenciar"}
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
