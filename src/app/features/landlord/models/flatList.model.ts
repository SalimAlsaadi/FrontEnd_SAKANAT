

export interface FlatListModel{

    id: number;
    flatNumber: string;
    numberOfRooms: string;
    numberOfBathrooms: string;
    hasLivingRoom: boolean;
    rented: boolean;
    floorNumber: string;
    description: string;
    region: string;
    wilaya: string;
    area: string;
    tenantType: string;
    rentTimeType: string;
    price: number;
    latitude?: number;
    longitude?: number;
    landlordId: number;
    landlordName: string;
    landlordPhoneNumber: string;
    buildingId: number;
    buildingName: string;
    hasParking: boolean;
    hasGym: boolean;
    hasSwimmingPool: boolean;
    images?: string[];
    
}