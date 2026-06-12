import requests
import time
import random
from datetime import datetime

API_URL = "http://localhost:8000/api/v1/attendance/"

def simulate_edge_device():
    print("Starting Edge IoT Camera Simulator...")
    print(f"Connecting to API Gateway: {API_URL}")
    time.sleep(1)

    students = [
        {"id": 1, "name": "Alice Smith"},
        {"id": 2, "name": "Bob Jones"},
        {"id": 3, "name": "Charlie Brown"},
        {"id": 4, "name": "Diana Prince", "proxy_risk": True}
    ]

    session_id = 101

    try:
        while True:
            student = random.choice(students)
            
            # Simulate analyzing face, voice, gait at the edge
            print(f"\n[Camera Node A] Detecting motion... Identifying subject...")
            time.sleep(1.5)

            modality = random.choice(["face", "face+gait", "face+voice"])
            
            # Determine confidence and spoofing
            if student.get("proxy_risk") and random.random() > 0.5:
                # Proxy attempt!
                confidence = round(random.uniform(0.4, 0.6), 2)
                spoofing_score = round(random.uniform(0.7, 0.95), 2)
                status = "proxy_suspected"
                print(f"WARNING: Proxy anomaly detected for ID {student['id']} ({modality})")
            else:
                # Normal presence
                confidence = round(random.uniform(0.85, 0.99), 2)
                spoofing_score = round(random.uniform(0.01, 0.15), 2)
                status = "present"
                print(f"Verified {student['name']} via {modality} (Confidence: {confidence})")

            payload = {
                "session_id": session_id,
                "user_id": student["id"],
                "confidence_score": confidence,
                "modality_used": modality,
                "spoofing_risk_score": spoofing_score,
                "status": status
            }

            try:
                response = requests.post(API_URL, json=payload)
                if response.status_code == 200:
                    print(f"Payload transmitted to central server successfully.")
                else:
                    print(f"Server error: {response.text}")
            except requests.exceptions.ConnectionError:
                 print("Cannot connect to backend API. Is FastAPI running?")

            # Wait before next event
            time.sleep(random.randint(3, 8))

    except KeyboardInterrupt:
        print("\nStopping Edge Simulator.")

if __name__ == "__main__":
    simulate_edge_device()
