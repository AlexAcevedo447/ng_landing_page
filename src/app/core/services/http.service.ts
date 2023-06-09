import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private _groupId!: string;
  private _headers!: HttpHeaders;
  protected baseApiUrl:string;

  constructor(private http: HttpClient) {
    this._headers = new HttpHeaders({ Group: this._groupId });
    this.baseApiUrl = environment.API_URL;
  }

  public get<T>(url: string, activateHeader:boolean = false ):Observable<T> {
    return this.http.get<T>(url, activateHeader ? { headers: this._headers }: {});
  }

  public post<T>(url: string, activateHeader:boolean = false, body:any ):Observable<T> {
    return this.http.post<T>(url, body ,activateHeader ? { headers: this._headers }: {});
  }

  public put<T>(url: string, activateHeader:boolean = false,body:any ):Observable<T> {
    return this.http.put<T>(url, body, activateHeader ? { headers: this._headers }: {});
  }

  public delete<T>(url: string, activateHeader:boolean = false ):Observable<T> {
    return this.http.delete<T>(url, activateHeader ? { headers: this._headers }: {});
  }
}

