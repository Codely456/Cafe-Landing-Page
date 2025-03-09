import os
import requests
from urllib.parse import urlparse

# Image URLs for each category
images = {
    'cafe-interior': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
    'coffee': {
        'espresso': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
        'neon-latte': 'https://images.unsplash.com/photo-1541167760496-1628856ab772',
        'cyber-mocha': 'https://images.unsplash.com/photo-1572442388796-11668a67e53d'
    },
    'pastries': {
        'croissant': 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
        'danish': 'https://images.unsplash.com/photo-1505253304499-671c55fb57fe'
    },
    'breakfast': {
        'full-breakfast': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666',
        'acai-bowl': 'https://images.unsplash.com/photo-1546039907-7fa05f864c02'
    },
    'desserts': {
        'chocolate-cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
        'macarons': 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d'
    }
}

def download_image(url, folder, filename):
    """Download image from URL and save to specified folder"""
    # Create folder if it doesn't exist
    os.makedirs(folder, exist_ok=True)
    
    # Add parameters for high quality image
    url = f"{url}?auto=format&fit=crop&w=1200&q=80"
    
    # Download image
    response = requests.get(url)
    if response.status_code == 200:
        filepath = os.path.join(folder, f"{filename}.jpg")
        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded: {filepath}")
    else:
        print(f"Failed to download: {url}")

def main():
    # Create main images directory
    base_dir = "images"
    os.makedirs(base_dir, exist_ok=True)
    
    # Download cafe interior image
    download_image(images['cafe-interior'], base_dir, 'cafe-interior')
    
    # Download category images
    for category, category_images in images.items():
        if isinstance(category_images, dict):
            category_dir = os.path.join(base_dir, category)
            for img_name, img_url in category_images.items():
                download_image(img_url, category_dir, img_name)

if __name__ == "__main__":
    main() 