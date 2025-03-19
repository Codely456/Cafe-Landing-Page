from PIL import Image
import os

# Create the breakfast directory if it doesn't exist
os.makedirs('images/breakfast', exist_ok=True)

try:
    # Open the source image
    img = Image.open('acai-bowl.jpg')
    
    # Save it to the destination
    img.save('images/breakfast/acai-bowl.jpg', 'JPEG', quality=95)
    
    print("Successfully saved acai-bowl.jpg to images/breakfast/")
except Exception as e:
    print(f"Error: {e}") 