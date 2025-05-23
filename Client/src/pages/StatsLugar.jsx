import React, { useEffect, useState } from 'react';
import { getTurnStats } from '../api/statsLugar';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';

