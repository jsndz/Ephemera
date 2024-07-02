### Color.me:

1. **Primary Red**

   - **HEX**: #EA3A36
   - **RGB**: 234, 58, 54
   - **CMYK**: 0, 75, 77, 8
   - **Pantone**: 17-1558
   - **Usage**:
     - Business name text
     - Slogan text
     - Call-to-action buttons
     - Links and accents

2. **Vibrant Orange**

   - **HEX**: #F27D2C
   - **RGB**: 242, 125, 44
   - **CMYK**: 0, 48, 82, 5
   - **Pantone**: 16-1257
   - **Usage**:
     - Icons
     - Highlights
     - Secondary buttons or hover states for primary buttons

3. **Pure White**

   - **HEX**: #FFFFFF
   - **RGB**: 255, 255, 255
   - **CMYK**: 0, 0, 0, 0
   - **Pantone**: 11-0601
   - **Usage**:
     - Main background of the webpage

4. **Soft Blue**

   - **HEX**: #B2BBDA
   - **RGB**: 178, 187, 218
   - **CMYK**: 18, 14, 0, 15
   - **Pantone**: 14-3949
   - **Usage**:
     - Background for sections
     - Background for cards or containers
     - Footer background

5. **Light Beige**
   - **HEX**: #E8E7D5
   - **RGB**: 232, 231, 213
   - **CMYK**: 0, 0, 8, 9
   - **Pantone**: 11-0106
   - **Usage**:
     - Text backgrounds
     - Navigation bar background
     - Forms or input fields background

# Summary of Color Usage on Webpage

- **Primary Red**: Use for business name, slogan, call-to-action buttons, links, and accents.
- **Vibrant Orange**: Use for icons, highlights, secondary buttons, or hover states for primary buttons.
- **Pure White**: Use as the main background color of the webpage.
- **Soft Blue**: Use for section backgrounds, cards or containers, and footer background.
- **Light Beige**: Use for text backgrounds, navigation bar background, forms, or input fields background.

These color names and placements will help create a user-friendly and visually appealing design for our webpage.

import React from 'react';

const Slide: React.FC = () => {
return (
<div className="w-full max-w-2xl h-96 flex flex-col items-center justify-center">
<input type="radio" name="slider" id="item-1" defaultChecked className="hidden" />
<input type="radio" name="slider" id="item-2" className="hidden" />
<input type="radio" name="slider" id="item-3" className="hidden" />

      <div className="relative w-full h-full mb-5 flex justify-center items-center">
        <label htmlFor="item-1" id="song-1" className="absolute w-3/5 h-full transform transition-transform duration-300 cursor-pointer">
          <div className="w-full h-full rounded-full overflow-hidden" style={{ transform: 'rotate(75deg)' }}>
            <img src="https://images.unsplash.com/photo-1530651788726-1dbf58eeef1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80" alt="song" className="w-full h-full object-cover" />
          </div>
        </label>
        <label htmlFor="item-2" id="song-2" className="absolute w-3/5 h-full transform transition-transform duration-300 cursor-pointer">
          <div className="w-full h-full rounded-full overflow-hidden" style={{ transform: 'rotate(75deg)' }}>
            <img src="https://images.unsplash.com/photo-1559386484-97dfc0e15539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80" alt="song" className="w-full h-full object-cover" />
          </div>
        </label>
        <label htmlFor="item-3" id="song-3" className="absolute w-3/5 h-full transform transition-transform duration-300 cursor-pointer">
          <div className="w-full h-full rounded-full overflow-hidden" style={{ transform: 'rotate(75deg)' }}>
            <img src="https://images.unsplash.com/photo-1533461502717-83546f485d24?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="song" className="w-full h-full object-cover" />
          </div>
        </label>
      </div>

      <div className="bg-white rounded-lg p-4 min-w-xs">
        <div className="flex items-center mb-3 h-9 overflow-hidden relative">
          <div className="mr-2">
            <svg width="20" height="20" fill="#2992dc" stroke="#2992dc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-play" viewBox="0 0 24 24">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </div>
          <div className="absolute w-full transition-transform duration-300" id="info-area">
            <label className="block w-full" id="song-info-1">
              <div className="text-sm font-semibold text-gray-800">Bunker</div>
              <div className="flex justify-between w-full text-xs text-gray-400">
                <div>Balthazar</div>
                <div className="font-medium text-gray-500">4.05</div>
              </div>
            </label>
            <label className="block w-full" id="song-info-2">
              <div className="text-sm font-semibold text-gray-800">Words Remain</div>
              <div className="flex justify-between w-full text-xs text-gray-400">
                <div>Moderator</div>
                <div className="font-medium text-gray-500">4.05</div>
              </div>
            </label>
            <label className="block w-full" id="song-info-3">
              <div className="text-sm font-semibold text-gray-800">Falling Out</div>
              <div className="flex justify-between w-full text-xs text-gray-400">
                <div>Otzeki</div>
                <div className="font-medium text-gray-500">4.05</div>
              </div>
            </label>
          </div>
        </div>
        <div className="h-1.5 w-full bg-blue-100 rounded overflow-hidden">
          <span className="block w-3/5 h-full bg-blue-600 rounded"></span>
        </div>
      </div>

      <style jsx>{`
        #item-1:checked ~ .relative #song-3,
        #item-2:checked ~ .relative #song-1,
        #item-3:checked ~ .relative #song-2 {
          transform: translateX(-40%) scale(0.8);
          opacity: 0.4;
          z-index: 0;
        }
        #item-1:checked ~ .relative #song-2,
        #item-2:checked ~ .relative #song-3,
        #item-3:checked ~ .relative #song-1 {
          transform: translateX(40%) scale(0.8);
          opacity: 0.4;
          z-index: 0;
        }
        #item-1:checked ~ .relative #song-1,
        #item-2:checked ~ .relative #song-2,
        #item-3:checked ~ .relative #song-3 {
          transform: translateX(0) scale(1);
          opacity: 1;
          z-index: 1;
        }
        #item-2:checked ~ .bg-white #info-area {
          transform: translateY(-36px);
        }
        #item-3:checked ~ .bg-white #info-area {
          transform: translateY(-72px);
        }
      `}</style>
    </div>

);
};

export default Slide;
