import os
import shutil
import cv2
import numpy as np

GALLERY_DIR = r"E:\Shero guppy\Gallery"
OUT_IMG_DIR = r"E:\Shero guppy\public\images\gallery"
OUT_VID_DIR = r"E:\Shero guppy\public\videos\gallery"

os.makedirs(OUT_IMG_DIR, exist_ok=True)
os.makedirs(OUT_VID_DIR, exist_ok=True)

video_files = [f for f in os.listdir(GALLERY_DIR) if f.lower().endswith(".mp4")]
video_files.sort()

print(f"Found {len(video_files)} videos in Gallery")

results = []

for idx, fname in enumerate(video_files, 1):
    src_path = os.path.join(GALLERY_DIR, fname)
    slug = f"farm-clip-{idx:02d}"
    out_img_name = f"{slug}.jpg"
    out_vid_name = f"{slug}.mp4"
    out_img_path = os.path.join(OUT_IMG_DIR, out_img_name)
    out_vid_path = os.path.join(OUT_VID_DIR, out_vid_name)
    
    # 1. Copy video to public/videos/gallery/
    if not os.path.exists(out_vid_path):
        shutil.copy2(src_path, out_vid_path)
    
    # 2. Extract best sharpest frame using OpenCV
    cap = cv2.VideoCapture(src_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS) or 25
    duration = total_frames / fps if fps > 0 else 0
    
    best_frame = None
    best_score = -1
    
    # Sample 15 candidate frames spread between 10% and 90% of video
    if total_frames > 10:
        sample_indices = np.linspace(int(total_frames * 0.1), int(total_frames * 0.9), 15, dtype=int)
        for f_idx in sample_indices:
            cap.set(cv2.CAP_PROP_POS_FRAMES, int(f_idx))
            ret, frame = cap.read()
            if not ret or frame is None:
                continue
            
            # Convert to gray to measure Laplacian variance (sharpness)
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            score = cv2.Laplacian(gray, cv2.CV_64F).var()
            
            # Avoid completely dark/blown out frames
            mean_brightness = gray.mean()
            if 30 < mean_brightness < 240 and score > best_score:
                best_score = score
                best_frame = frame
    else:
        ret, frame = cap.read()
        if ret:
            best_frame = frame
            
    cap.release()
    
    if best_frame is not None:
        cv2.imwrite(out_img_path, best_frame, [int(cv2.IMWRITE_JPEG_QUALITY), 92])
        print(f"[{idx}/{len(video_files)}] Processed {fname} -> {out_img_name} (sharpness: {best_score:.1f})")
        results.append({
            "id": 200 + idx,
            "slug": slug,
            "videoUrl": f"/videos/gallery/{out_vid_name}",
            "thumbnailUrl": f"/images/gallery/{out_img_name}",
            "duration": round(duration, 1),
            "sizeBytes": os.path.getsize(out_vid_path)
        })
    else:
        print(f"[{idx}/{len(video_files)}] Failed to grab frame for {fname}")

print(f"\nSuccessfully processed {len(results)} videos and generated thumbnails!")
