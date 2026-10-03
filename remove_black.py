from PIL import Image, ImageDraw

def remove_black_background(input_path, output_path, tolerance=10):
    img = Image.open(input_path).convert("RGBA")
    
    # We will do a flood fill from the 4 corners to find the background pixels.
    # But since Pillow's floodfill doesn't support alpha directly well, 
    # we can just find connected components.
    
    # Create a mask
    mask = Image.new("L", img.size, 255)
    
    # Pillow's floodfill works on the image directly.
    # Let's just create a solid color that isn't in the image, e.g., magenta.
    magenta = (255, 0, 255, 255)
    
    ImageDraw.floodfill(img, (0, 0), magenta, thresh=tolerance)
    ImageDraw.floodfill(img, (img.width-1, 0), magenta, thresh=tolerance)
    ImageDraw.floodfill(img, (0, img.height-1), magenta, thresh=tolerance)
    ImageDraw.floodfill(img, (img.width-1, img.height-1), magenta, thresh=tolerance)
    
    data = img.getdata()
    new_data = []
    for item in data:
        if item[0] == 255 and item[1] == 0 and item[2] == 255:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

remove_black_background(
    "/Users/anakolte/Documents/GitHub/My-Premium-Portfolio/src/assets/hero_images/image 3.png", 
    "/Users/anakolte/Documents/GitHub/My-Premium-Portfolio/src/assets/hero_images/image 3.png"
)
print("Done!")
