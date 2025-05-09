import { useState, useEffect, useRef } from "react";

interface SlideCaptchaProps {
  backgroundUrl: string;
  sliderUrl: string;
  sliderY: number;
  captchaId: string;
  onChangePosition: (position: number) => void;
  targetPosition?: number; // Adding the missing prop
}

export default function SlideCaptcha({
  backgroundUrl,
  sliderUrl,
  sliderY,
  captchaId,
  onChangePosition,
  targetPosition = 50, // Default value if not provided
}: SlideCaptchaProps) {
  // State variables
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [sliderLeft, setSliderLeft] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showFail, setShowFail] = useState<boolean>(false);

  // Refs for DOM elements
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderHandleRef = useRef<HTMLDivElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const sliderPieceRef = useRef<HTMLImageElement>(null);
  const backgroundRef = useRef<HTMLImageElement>(null);

  // Layout measurements
  const [dimensions, setDimensions] = useState({
    containerWidth: 0,
    handleWidth: 0,
    maxSliderLeft: 0,
    pieceWidth: 0,
    sliderYPosition: 0,
  });

  // Initialize dimensions on component mount
  useEffect(() => {
    if (
      containerRef.current &&
      sliderHandleRef.current &&
      backgroundRef.current &&
      sliderPieceRef.current
    ) {
      const containerWidth = containerRef.current.offsetWidth;
      const handleWidth = sliderHandleRef.current.offsetWidth;
      const pieceWidth = sliderPieceRef.current.offsetWidth;
      const maxSliderLeft = containerWidth - handleWidth - 30; // 30px margin
      const sliderYPosition =
        (sliderY / 100) * backgroundRef.current.offsetHeight;

      setDimensions({
        containerWidth,
        handleWidth,
        maxSliderLeft,
        pieceWidth,
        sliderYPosition,
      });
    }
  }, [sliderY]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && sliderHandleRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const handleWidth = sliderHandleRef.current.offsetWidth;
        const maxSliderLeft = containerWidth - handleWidth - 30;

        setDimensions((prev) => ({
          ...prev,
          containerWidth,
          handleWidth,
          maxSliderLeft,
        }));

        if (!isVerified) {
          setSliderLeft(0);
          setCurrentPosition(0);
          setIsActive(false);
          updateSliderUIPosition(0);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isVerified]);

  // Update UI based on slider position
  const updateSliderUIPosition = (newLeft: number) => {
    if (
      sliderHandleRef.current &&
      sliderTrackRef.current &&
      sliderPieceRef.current &&
      backgroundRef.current
    ) {
      // Update handle position
      sliderHandleRef.current.style.left = `${newLeft}px`;

      // Update track width
      sliderTrackRef.current.style.width = `${
        newLeft + dimensions.handleWidth / 2
      }px`;

      // Update slider piece position
      const backgroundWidth = backgroundRef.current.offsetWidth;
      const position = newLeft / dimensions.maxSliderLeft;
      const pieceLeft = position * (backgroundWidth - dimensions.pieceWidth);
      sliderPieceRef.current.style.left = `${pieceLeft}px`;
    }
  };

  // Update slider position based on drag
  const updateSliderPosition = (clientX: number) => {
    const dx = clientX - startX;
    let newLeft = sliderLeft + dx;

    // Constrain within bounds
    newLeft = Math.max(0, Math.min(newLeft, dimensions.maxSliderLeft));

    // Update UI
    updateSliderUIPosition(newLeft);

    // Calculate position as percentage (0-100)
    const newPosition = (newLeft / dimensions.maxSliderLeft) * 100;
    setCurrentPosition(newPosition);

    onChangePosition(newPosition);

    // Activate verify button if moved enough
    if (newPosition > 10) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  // Start drag operation
  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (isVerified) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setSliderLeft(sliderHandleRef.current?.offsetLeft || 0);
    setIsDragging(true);
  };

  // Handle drag operation
  const onDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    if (e.type === "touchmove") {
      e.preventDefault();
    }

    const clientX =
      e.type === "touchmove"
        ? (e as TouchEvent).touches[0].clientX
        : (e as MouseEvent).clientX;
    updateSliderPosition(clientX);
  };

  // End drag operation
  const stopDrag = () => {
    setIsDragging(false);
  };

  // Setup drag event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("touchmove", onDrag, { passive: false });
      document.addEventListener("mouseup", stopDrag);
      document.addEventListener("touchend", stopDrag);
    } else {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchend", stopDrag);
    }

    return () => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchend", stopDrag);
    };
  }, [isDragging]);

  // Handle verification
  // Handle verification
  const verifyCaptcha = () => {
    if (!isActive) return;

    // Tambahkan console.log untuk debugging
    console.log({
      currentPosition,
      targetPosition,
      difference: Math.abs(currentPosition - targetPosition),
    });

    // Sesuaikan toleransi menjadi lebih besar
    const tolerance = 10; // Toleransi yang lebih besar (10% alih-alih 3%)
    const isCorrect = Math.abs(currentPosition - targetPosition) <= tolerance;

    if (!isCorrect) {
      // setShowFail(true);
      setTimeout(() => {
        refreshCaptcha();
      }, 2000);
      return;
    }

    // Solution data
    const solutionData = {
      captchaId: captchaId,
      sliderPosition: currentPosition,
    };

    // Show success state
    setIsVerified(true);
    setShowSuccess(true);

    // Try to send message to parent
    if (window.opener) {
      window.opener.postMessage(solutionData, "*");
      setTimeout(() => window.close(), 1500);
    } else if (window.parent && window.parent !== window) {
      window.parent.postMessage(solutionData, "*");
    }
  };

  const refreshCaptcha = () => {
    // Reset semua status yang terkait dengan captcha
    setIsVerified(false); // Menandakan bahwa captcha belum terverifikasi
    setCurrentPosition(0); // Mengatur posisi slider ke 0
    setIsActive(false); // Menonaktifkan tombol verifikasi
    setShowSuccess(false); // Menyembunyikan pesan sukses
    setShowFail(false); // Menyembunyikan pesan gagal

    // Menyetel ulang slider ke posisi awal
    setSliderLeft(0);
    updateSliderUIPosition(0); // Pastikan UI slider kembali ke posisi awal
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`w-80 bg-white shadow-md rounded-lg overflow-hidden ${
          isVerified ? "verified" : ""
        }`}
      >
        {/* Header */}
        <div className="p-2.5 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-sm text-gray-600 font-medium">
            Geser slider untuk menyelesaikan puzzle
          </h3>
          <div className="flex gap-2.5">
            <button
              onClick={refreshCaptcha}
              className="bg-transparent border-none cursor-pointer text-base text-gray-500 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200"
              title="Refresh"
            >
              ⟳
            </button>
            <button
              className="bg-transparent border-none cursor-pointer text-base text-gray-500 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200"
              title="Info"
            >
              ⓘ
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="relative h-[180px] overflow-hidden">
          <img
            ref={backgroundRef}
            src={backgroundUrl}
            alt="Captcha Background"
            className="w-full h-full object-cover"
          />
          <img
            ref={sliderPieceRef}
            src={sliderUrl}
            alt="Slider Piece"
            className="absolute z-10 cursor-pointer touch-none"
            style={{
              left: "0px",
              top: `${dimensions.sliderYPosition}px`, // Adjustment for proper alignment
            }}
          />
        </div>

        {/* Slider */}
        <div className="relative mx-4 my-4 h-10 bg-gray-200 rounded-full">
          <div
            ref={sliderTrackRef}
            className={`absolute top-0 left-0 h-full rounded-full transition-colors duration-300 ${
              isVerified ? "bg-green-500" : "bg-gray-300"
            }`}
            style={{ width: "0px" }}
          ></div>

          <div
            ref={sliderHandleRef}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            className={`absolute top-0 left-0 w-10 h-10 bg-white shadow-md rounded-full cursor-pointer 
              flex justify-center items-center text-xl text-gray-400 transition-colors duration-300 z-10 touch-none
              ${isDragging ? "bg-gray-100" : ""}`}
          >
            ⇥
          </div>

          {!isVerified && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-500 text-sm">
              Geser ke kanan untuk memverifikasi
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 flex justify-between items-center border-t border-gray-100">
          <div>
            {showSuccess && (
              <span className="text-green-500 text-sm">
                Verifikasi berhasil
              </span>
            )}
            {showFail && (
              <span className="text-red-500 text-sm">
                Verifikasi gagal, coba lagi
              </span>
            )}
          </div>
          <button
            onClick={verifyCaptcha}
            className={`bg-green-500 border-none text-white py-1.5 px-3 rounded text-sm cursor-pointer
              ${
                isActive && !isVerified
                  ? "opacity-100 hover:bg-green-600"
                  : "opacity-70 pointer-events-none"
              }
              ${isVerified ? "opacity-100" : ""}`}
          >
            {isVerified ? "Terverifikasi" : "Verifikasi"}
          </button>
        </div>
      </div>
    </>
  );
}
