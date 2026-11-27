using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BuyingTool.Services;
using System.Data;

namespace BuyingTool.Controllers
{
    public class AuthorizationsController : ApiController
    {
        [Route("api/Authorizations/GetAuthorizedBrands")]
        public List<string> GetAuthorizedBrands(string idnumber)
        {
            Service service = new Service();
            DataTable dataSet = service.GetAuthorizedBrands(idnumber);
            List<string> resultlist = new List<string>();
            foreach (DataRow row in dataSet.Rows)
            {
                resultlist.Add(row["Brand"].ToString());
            }
            return resultlist;
        }
        
        [Route("api/Authorizations/GetAuthorizedAreas")]
        public List<string> GetAuthorizedAreas(string idnumber)
        {
            Service service = new Service();
            DataTable dataSet = service.GetAuthorizedAreas(idnumber);
            List<string> resultlist = new List<string>();
            foreach (DataRow row in dataSet.Rows)
            {
                resultlist.Add(row["Area"].ToString());
            }
            return resultlist;
        } 
        [Route("api/Authorizations/GetAuthorizedChannels")]
        public List<string> GetAuthorizedChannels(string idnumber)
        {
            Service service = new Service();
            DataTable dataSet = service.GetAuthorizedChannels(idnumber);
            List<string> resultlist = new List<string>();
            foreach (DataRow row in dataSet.Rows)
            {
                resultlist.Add(row["Channel"].ToString());
            }
            return resultlist;
        } 
        [Route("api/Authorizations/GetAuthorizedCountries")]
        public List<string> GetAuthorizedCountries(string idnumber )
        {
            Service service = new Service();
            DataTable dataSet = service.GetAuthorizedCountries(idnumber);
            List<string> resultlist = new List<string>();
            foreach(DataRow row in dataSet.Rows)
            {
                resultlist.Add(row["Country"].ToString());
            }
            return resultlist;
        } 
        [Route("api/Authorizations/GetAuthorizedDepartments")]
        public List<string> GetAuthorizedDepartments(string idnumber )
        {
            Service service = new Service();
            DataTable dataSet = service.GetAuthorizedDepartments(idnumber);
            List<string> resultlist = new List<string>();
            foreach (DataRow row in dataSet.Rows)
            {
                resultlist.Add(row["Department"].ToString());
            }
            return resultlist;
        } 
        [Route("api/Authorizations/GetAuthorizedDivisions")]
        public List<string> GetAuthorizedDivisions(string idnumber )
        {
            Service service = new Service();
            DataTable dataSet = service.GetAuthorizedDivisions(idnumber);
            List<string> resultlist = new List<string>();
            foreach (DataRow row in dataSet.Rows)
            {
                resultlist.Add(row["Division"].ToString());
            }
            return resultlist;
        }
        [Route("api/Authorizations/GetAuthorizedRegions")]
        public List<string> GetAuthorizedRegions(string idnumber )
        {
            Service service = new Service();
            DataTable dataSet = service.GetAuthorizedRegions(idnumber);
            List<string> resultlist = new List<string>();
            foreach (DataRow row in dataSet.Rows)
            {
                resultlist.Add(row["Region"].ToString());
            }
            return resultlist;
        }
        [Route("api/Authorizations/GetAuthorizedTerritories")]
        public List<string> GetAuthorizedTerritories(string idnumber )
        {
            Service service = new Service();
            DataTable dataSet = service.GetAuthorizedTerritories(idnumber);
            List<string> resultlist = new List<string>();
            foreach (DataRow row in dataSet.Rows)
            {
                resultlist.Add(row["Territory"].ToString());
            }
            return resultlist;
        }
    }
}
