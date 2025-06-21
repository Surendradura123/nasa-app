const request = require('supertest');
const app = require('./app');

jest.mock('axios');
const axios = require('axios');

// Apod test
describe('GET /api/apod', () => {
  it('returns APOD data successfully', async () => {
    const mockData = {
      title: 'Mock APOD Title',
      url: 'https://example.com/image.jpg',
      explanation: 'This is a mock explanation.',
      media_type: 'image',
    };

    axios.get.mockResolvedValueOnce({ data: mockData });

    const res = await request(app).get('/api/apod');

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(mockData.title);
    expect(res.body.url).toBe(mockData.url);
  });

  it('handles API errors gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    const res = await request(app).get('/api/apod');

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error');
  });
});


//MarsRover Test
describe('GET /api/mars', () => {
  it('should return Mars rover photos successfully', async () => {
    const mockPhotos = [
      {
        id: 102693,
        img_src: 'http://mars.jpl.nasa.gov/msl-raw-images/image.jpg',
        camera: { name: 'FHAZ', full_name: 'Front Hazard Avoidance Camera' },
      },
    ];

    axios.get.mockResolvedValueOnce({
      data: { photos: mockPhotos },
    });

    const res = await request(app).get('/api/mars?rover=curiosity&sol=1000');

    expect(res.statusCode).toBe(200);
    expect(res.body.photos).toBeDefined();
    expect(Array.isArray(res.body.photos)).toBe(true);
    expect(res.body.photos[0].camera.name).toBe('FHAZ');
  });

  it('should handle error from NASA API', async () => {
    axios.get.mockRejectedValueOnce(new Error('NASA API down'));

    const res = await request(app).get('/api/mars?rover=curiosity&sol=1000');

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error', 'Failed to fetch Mars photos');
  });

  it('should include camera parameter when present', async () => {
    const mockPhotos = [];

    axios.get.mockResolvedValueOnce({ data: { photos: mockPhotos } });

    const res = await request(app).get('/api/mars?rover=curiosity&sol=1000&camera=FHAZ');

    expect(res.statusCode).toBe(200);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('&camera=FHAZ'));
  });
});

describe('GET /api/neo', () => {
  it('returns daily NEO counts', async () => {
    const mockResponse = {
      near_earth_objects: {
        '2025-06-18': [{ id: '1' }, { id: '2' }],
        '2025-06-19': [{ id: '3' }],
      },
    };

    axios.get.mockResolvedValueOnce({ data: mockResponse });

    const res = await request(app).get('/api/neo?start_date=2025-06-18&end_date=2025-06-19');

    expect(res.statusCode).toBe(200);
    expect(res.body.near_earth_objects).toBeDefined();
    expect(Object.keys(res.body.near_earth_objects).length).toBe(2);
  });
});