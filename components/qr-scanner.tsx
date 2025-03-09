"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface QRScannerProps {
  onScan: (data: string) => void
  onClose: () => void
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scanning, setScanning] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Only run on client-side to prevent hydration issues
  useEffect(() => {
    setMounted(true)

    let stream: MediaStream | null = null

    const startCamera = async () => {
      try {
        setLoading(true)
        // Only access camera on client-side
        if (typeof navigator !== "undefined" && navigator.mediaDevices) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          })

          if (videoRef.current) {
            videoRef.current.srcObject = stream
            videoRef.current.play()
            setLoading(false)
            scanQRCode()
          }
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        setError("Could not access camera. Please ensure you've granted camera permissions.")
        setLoading(false)
      }
    }

    const scanQRCode = () => {
      if (!scanning) return

      const checkVideoFrame = () => {
        if (!videoRef.current || !canvasRef.current || !scanning) return

        const video = videoRef.current
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")

        if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.height = video.videoHeight
          canvas.width = video.videoWidth
          context.drawImage(video, 0, 0, canvas.width, canvas.height)

          try {
            // In a real implementation, you would use a QR code library like jsQR here
            // For this example, we'll simulate finding a QR code after a few seconds
            setTimeout(() => {
              if (scanning) {
                const simulatedQRData = "PROD-12345-67890"
                onScan(simulatedQRData)
                setScanning(false)
              }
            }, 3000)
          } catch (error) {
            // Continue scanning if no QR code is found
          }
        }

        if (scanning) {
          requestAnimationFrame(checkVideoFrame)
        }
      }

      requestAnimationFrame(checkVideoFrame)
    }

    if (mounted) {
      startCamera()
    }

    return () => {
      setScanning(false)
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [onScan, scanning, mounted])

  // Don't render anything during SSR
  if (!mounted) {
    return null
  }

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
          Beta
        </Badge>
        <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-0">
        <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Accessing camera...</span>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-4 text-center">
              <div className="text-destructive mb-2">{error}</div>
              <Button onClick={onClose}>Close</Button>
            </div>
          )}

          <video
            ref={videoRef}
            className={cn("absolute inset-0 h-full w-full object-cover", (loading || error) && "opacity-0")}
            muted
            playsInline
          />

          <canvas ref={canvasRef} className="hidden" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-3/4 h-3/4 border-2 border-primary rounded-lg"></div>
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center text-sm bg-background/80 backdrop-blur-sm py-2 mx-4 rounded-md">
            Position the QR code within the frame
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

