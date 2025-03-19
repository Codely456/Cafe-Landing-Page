from PIL import Image, ImageDraw, ImageFont
import random
import os

def create_cyberpunk_interior(width=800, height=600):
    # Create a new image with a dark background
    image = Image.new('RGB', (width, height), (10, 10, 15))
    draw = ImageDraw.Draw(image)

    # Create a grid pattern
    for x in range(0, width, 40):
        color = (0, random.randint(100, 255), random.randint(100, 255))
        draw.line([(x, 0), (x, height)], fill=color, width=1)
    for y in range(0, height, 40):
        color = (random.randint(100, 255), 0, random.randint(100, 255))
        draw.line([(0, y), (width, y)], fill=color, width=1)

    # Add some neon elements
    for _ in range(5):
        x1 = random.randint(0, width)
        y1 = random.randint(0, height)
        x2 = x1 + random.randint(-200, 200)
        y2 = y1 + random.randint(-200, 200)
        color = (random.randint(150, 255), random.randint(150, 255), random.randint(150, 255))
        draw.line([(x1, y1), (x2, y2)], fill=color, width=3)

    # Add some furniture silhouettes
    for _ in range(4):
        x = random.randint(100, width-200)
        y = random.randint(100, height-200)
        size = random.randint(50, 100)
        color = (random.randint(50, 150), random.randint(50, 150), random.randint(50, 150))
        draw.rectangle([x, y, x+size, y+size], fill=color)

    # Ensure the images directory exists
    if not os.path.exists('images'):
        os.makedirs('images')

    # Save the image
    image.save('images/cafe-interior.jpg', quality=95)

if __name__ == '__main__':
    create_cyberpunk_interior()
    print("Cafe interior image created successfully!") 